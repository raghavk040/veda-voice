from fastapi import FastAPI

app = FastAPI(title="Veda Voice AI Service")

@app.get("/health")
def health():
    return {"status": "ok"}
