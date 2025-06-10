import 'dotenv/config'

export default {
  expo: {
    name: 'MiApp',
    slug: 'miapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    extra: {
      BACKEND_URL: process.env.BACKEND_URL
    }
  }
}

