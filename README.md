
# Aditya Suryawanshi – Personal Website

Production domain: https://adityasuryawanshi.com

## Deploy to Google Cloud Run

The included multi-stage `Dockerfile` builds the Vite site and serves it with
Nginx on Cloud Run.

```bash
gcloud run deploy aditya-portfolio \
  --source . \
  --project advance-airline-465318-q7 \
  --region europe-west1 \
  --allow-unauthenticated
```

Production domain: https://adityasuryawanshi.com
