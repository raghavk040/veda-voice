from fastapi import APIRouter, HTTPException

from app.models.voice import (
    TranscriptionRequest,
    TranscriptionResponse,
    SymptomAnalysisRequest,
    SymptomAnalysisResponse,
)
from app.services.voice_service import voice_ai_service

router = APIRouter()


@router.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe_audio(request: TranscriptionRequest):
    try:
        return await voice_ai_service.transcribe_audio(
            audio_base64=request.audioBase64,
            mime_type=request.mimeType,
            language=request.language,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@router.post("/analyze", response_model=SymptomAnalysisResponse)
async def analyze_symptoms(request: SymptomAnalysisRequest):
    try:
        return await voice_ai_service.analyze_symptoms(request.transcription)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
