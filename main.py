from fastapi import FastAPI, HTTPException, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session , declarative_base
import pdfplumber
import pandas as pd
from typing import List
import json
import tempfile
import os
from urllib.parse import quote_plus
from dotenv import load_dotenv
# -------------------- FastAPI Setup --------------------
app = FastAPI()

# Optional: CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["uploadify-pdf-wizard-90.lovable.app"], # front end domain 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Database Setup --------------------
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = quote_plus(os.getenv("DB_PASSWORD"))
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

print("PASSWORD:", repr(DB_PASSWORD))  # this will show any hidden characters in pasword
print("HOST:", repr(DB_HOST))  # this will show any hidden characters in host name 

DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)

print("DATABASE_URL:", DATABASE_URL) # this will show the url the machine will use to connect to the database   

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class PDFTable(Base):
    __tablename__ = "pdf_tables"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    page_number = Column(Integer)
    table_number = Column(Integer)
    table_data = Column(Text)

# Create the table
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------- Routes --------------------

@app.get("/ping")
def ping():
    return {"message": "API is live"}

@app.post("/extract-tables/")
async def extract_tables(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF file")

    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
            temp.write(await file.read())
            temp_path = temp.name

        tables_data = []

        with pdfplumber.open(temp_path) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                tables = page.extract_tables()

                for table_num, table in enumerate(tables, 1):
                    if not table:
                        continue
                    
                    df = pd.DataFrame(table[1:], columns=table[0])

                    table_entry = PDFTable(
                        filename=file.filename,
                        page_number=page_num,
                        table_number=table_num,
                        table_data=json.dumps(df.to_dict(orient='records'))
                    )
                    db.add(table_entry)
                    db.commit()

                    tables_data.append({
                        "page": page_num,
                        "table": table_num,
                        "data": df.to_dict(orient='records')
                    })

        os.remove(temp_path)  # Clean up

        return {
            "message": "Tables extracted and stored successfully",
            "filename": file.filename,
            "tables_found": len(tables_data),
            "tables": tables_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
@app.get("/tables/")
def get_all_tables(db: Session = Depends(get_db)):
    tables = db.query(PDFTable).all()
    return [
        {
            "id": t.id,
            "filename": t.filename,
            "page_number": t.page_number,
            "table_number": t.table_number
        }
        for t in tables
    ]

@app.get("/table/{id}")
def get_table_by_id(id: int, db: Session = Depends(get_db)):
    table = db.query(PDFTable).filter(PDFTable.id == id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")
    
    return {
        "id": table.id,
        "filename": table.filename,
        "page_number": table.page_number,
        "table_number": table.table_number,
        "data": json.loads(table.table_data)
    }
