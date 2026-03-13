from pydantic import BaseModel
from typing import Optional, List


class TranscriptionRequest(BaseModel):
    audioBase64: str
    mimeType: str = "audio/webm"
    language: Optional[str] = None


class TranscriptionResponse(BaseModel):
    transcription: str
    confidence: float
    summary: str
    keywords: List[str]


class SymptomAnalysisRequest(BaseModel):
    transcription: str


class SymptomAnalysisResponse(BaseModel):
    analysis: str
    recommendations: List[str]
    severity: str = "low"
    disclaimer: str = (
        "This is an AI-generated analysis for informational purposes only. "
        "Please consult a qualified healthcare professional for medical advice."
    )
