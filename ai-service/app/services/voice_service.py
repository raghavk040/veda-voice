import base64
import tempfile
import os
from typing import Optional

from openai import AsyncOpenAI

from app.core.config import settings
from app.models.voice import TranscriptionResponse, SymptomAnalysisResponse


class VoiceAIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)

    async def transcribe_audio(
        self, audio_base64: str, mime_type: str, language: Optional[str] = None
    ) -> TranscriptionResponse:
        audio_bytes = base64.b64decode(audio_base64)

        suffix = self._get_suffix(mime_type)
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        try:
            with open(tmp_path, "rb") as audio_file:
                response = await self.client.audio.transcriptions.create(
                    model=settings.whisper_model,
                    file=audio_file,
                    language=language,
                )
            transcription = response.text

            summary = await self._summarize(transcription)
            keywords = await self._extract_keywords(transcription)

            return TranscriptionResponse(
                transcription=transcription,
                confidence=0.95,
                summary=summary,
                keywords=keywords,
            )
        finally:
            os.unlink(tmp_path)

    async def analyze_symptoms(self, transcription: str) -> SymptomAnalysisResponse:
        prompt = f"""You are a medical AI assistant. Analyze the following patient voice note and provide:
1. A brief clinical analysis
2. 3-5 recommendations
3. Severity level (low/medium/high)

Patient note: "{transcription}"

Respond in JSON format with keys: analysis, recommendations (array), severity."""

        response = await self.client.chat.completions.create(
            model=settings.openai_model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
        )

        import json
        data = json.loads(response.choices[0].message.content)

        return SymptomAnalysisResponse(
            analysis=data.get("analysis", ""),
            recommendations=data.get("recommendations", []),
            severity=data.get("severity", "low"),
        )

    async def _summarize(self, text: str) -> str:
        response = await self.client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {
                    "role": "user",
                    "content": f"Summarize the following patient medical note in 1-2 sentences: {text}",
                }
            ],
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()

    async def _extract_keywords(self, text: str) -> list:
        response = await self.client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {
                    "role": "user",
                    "content": f"Extract 3-5 medical keywords from this text. Return as comma-separated values only: {text}",
                }
            ],
            max_tokens=50,
        )
        raw = response.choices[0].message.content.strip()
        return [kw.strip() for kw in raw.split(",")]

    @staticmethod
    def _get_suffix(mime_type: str) -> str:
        mapping = {
            "audio/webm": ".webm",
            "audio/mp4": ".mp4",
            "audio/mpeg": ".mp3",
            "audio/wav": ".wav",
            "audio/ogg": ".ogg",
        }
        return mapping.get(mime_type, ".webm")


voice_ai_service = VoiceAIService()
