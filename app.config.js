import 'dotenv/config'

export default {
  expo: {
    name: 'AppMovil',
    slug: 'app-movil',
    version: '1.0.0',
    scheme: 'intex',
    extra: {
      BACKEND_URL: process.env.BACKEND_URL
    }
  }
}

