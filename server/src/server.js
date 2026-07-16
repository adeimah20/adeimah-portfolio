import app from './app.js';
import { ENV } from './config/env.js';

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`[Server] Berhasil berjalan pada port ${PORT}`);
  console.log(`[Server] CORS mengizinkan origin dari: ${ENV.CLIENT_URL}`);
  console.log(`[Server] Endpoint Health Check aktif di: http://localhost:${PORT}/health`);
});
