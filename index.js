// ================== CLUTCHX RGB + LIGHTNING + PAIRING ==================
async function clutchxBannerWithPairing(pairingCode) {
  if (global.__CLUTCHX_BANNER__) return
  global.__CLUTCHX_BANNER__ = true

  const rgb = ['\x1b[31m','\x1b[33m','\x1b[32m','\x1b[36m','\x1b[34m','\x1b[35m']
  const white = '\x1b[97m'
  const reset = '\x1b[0m'

  const banner = `
   ██████╗██╗     ██╗   ██╗████████╗ ██████╗██╗  ██╗██╗  ██╗
  ██╔════╝██║     ██║   ██║╚══██╔══╝██╔════╝██║  ██║╚██╗██╔╝
  ██║     ██║     ██║   ██║   ██║   ██║     ███████║ ╚███╔╝ 
  ██║     ██║     ██║   ██║   ██║   ██║     ██╔══██║ ██╔██╗ 
  ╚██████╗███████╗╚██████╔╝   ██║   ╚██████╗██║  ██║██╔╝ ██╗
   ╚═════╝╚══════╝ ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
        ⚡🔥 CLUTCHX BAILEYS 🔥⚡
  `

  let step = 0
  return new Promise((resolve) => {
    const iv = setInterval(() => {
      console.clear()

      if (step === 0 || step === 4) {
        console.log(white + banner + reset)
      } else {
        console.log(rgb[step % rgb.length] + banner + reset)
      }

      // ⚡ PETIR TERAKHIR → PAIRING CODE
      if (step === 4 && pairingCode) {
        console.log(`
${white}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 PAIRING CODE:
${rgb[5]}${pairingCode}${reset}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
      }

      step++
      if (step > 7) {
        clearInterval(iv)
        resolve()
      }
    }, 200)
  })
}
// ======================================================================


// ========================== BAILEYS CORE ===============================
const {
  default: makeWASocket,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  })

  // 🔑 GANTI NOMOR LU (PAKAI 62, TANPA +)
  const pairingCode = await sock.requestPairingCode('628xxxxxxxxxx')

  // ⚡ BANNER + PAIRING CODE
  await clutchxBannerWithPairing(pairingCode)

  sock.ev.on('creds.update', saveCreds)
}

startBot()
// ======================================================================

