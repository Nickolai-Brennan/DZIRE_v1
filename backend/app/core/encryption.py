"""backend/app/core/encryption.py — Fernet-based token encryption/decryption."""

from __future__ import annotations

import logging
import os

logger = logging.getLogger(__name__)


def _get_fernet():
    """Return a Fernet instance built from FERNET_ENCRYPTION_KEY env var."""
    from cryptography.fernet import Fernet

    key = os.environ.get("FERNET_ENCRYPTION_KEY")
    if not key:
        return None
    return Fernet(key.encode() if isinstance(key, str) else key)


def encrypt_token(plaintext: str) -> str:
    """Encrypt *plaintext* and return a URL-safe base64 ciphertext string.

    If FERNET_ENCRYPTION_KEY is not set, a warning is logged and the value is
    returned prefixed with ``UNENCRYPTED:`` so callers can detect unprotected
    tokens at runtime.
    """
    fernet = _get_fernet()
    if fernet is None:
        logger.warning(
            "FERNET_ENCRYPTION_KEY is not set — storing token unencrypted. "
            "Set the key before deploying to production."
        )
        return f"UNENCRYPTED:{plaintext}"
    return fernet.encrypt(plaintext.encode()).decode()


def decrypt_token(ciphertext: str) -> str:
    """Decrypt *ciphertext* and return the original plaintext string.

    Raises ``RuntimeError`` if FERNET_ENCRYPTION_KEY is not set.
    Handles legacy ``UNENCRYPTED:`` prefixed values transparently.
    """
    if ciphertext.startswith("UNENCRYPTED:"):
        return ciphertext[len("UNENCRYPTED:"):]

    fernet = _get_fernet()
    if fernet is None:
        raise RuntimeError(
            "FERNET_ENCRYPTION_KEY is not configured — cannot decrypt token. "
            "Set the environment variable and restart the application."
        )
    return fernet.decrypt(ciphertext.encode()).decode()
