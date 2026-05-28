import { useEffect, useMemo, useRef, useState } from 'react'

const EVENT_DATE = new Date('2026-07-17T14:30:00-06:00')
const MAPS_LINK = 'https://maps.app.goo.gl/BkvtgkiEe3y1R3937'
const WHATSAPP_LINK = 'https://wa.me/527472736556'
const MUSIC_SRC = '/audio/levitate.mp3'

const graduates = [
  'ALAN YAHIR SALDAÑA RENDON',
  'BARDO ALEJANDRO TERRAZAS LINARES',
  'DALIA MORALES GONZALEZ',
  'ELIZABETH FRANCISCO POBLANO',
  'EMANUEL VELAZQUEZ BASURTO',
  'EVELIN ANET GARIBAY NAVARRETE',
  'FRIDA VICTORIA BERNAL LÓPEZ',
  'ITZEL MARCELINA CALDERON LEYVA',
  'JENNIFER FIGUEROA LUNA',
  'JOSE ALFREDO PEREZ CAMARGO',
  'JOSE MANUEL BRAVO MEJIA',
  'JOSELIN MAXIMILIANO JERONIMO',
  'JUAN CARLOS ALBERTO CASTILLO RADILLA',
  'JULIO CESAR ORTIZ HERNANDEZ',
  'KENIA YOSELIN LEYVA HERNANDEZ',
  'LUIS ANGEL CASTRO ORTIZ',
  'MILTON ARMANDO RAMOS MORALES',
  'VICTOR HUGO CHAVELAS CASTRO',
]


function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function HelmetIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M12 36c0-10.6 8.2-19.5 18.8-20.7V14c0-1.7 1.4-3 3-3h2.4c1.7 0 3 1.3 3 3v1.3C49.8 16.5 58 25.4 58 36v2.2c0 1.5-1.2 2.8-2.8 2.8H14.8c-1.5 0-2.8-1.3-2.8-2.8V36Z" fill="currentColor"/>
      <path d="M22 27.5h20" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
      <path d="M17 41h36v3.8c0 2.3-1.9 4.2-4.2 4.2H21.2c-2.3 0-4.2-1.9-4.2-4.2V41Z" fill="currentColor"/>
      <path d="M31.8 15.2v11.2" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(targetDate.getTime() - Date.now(), 0)
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calc())

  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.14 }
    )

    const items = document.querySelectorAll('.reveal')
    items.forEach((item) => observer.observe(item))
    return () => items.forEach((item) => observer.unobserve(item))
  }, [])
}

function CountBox({ value, label }) {
  return (
    <div className="count-box">
      <strong>{String(value).padStart(2, '0')}</strong>
      <span>{label}</span>
    </div>
  )
}

function DetailCard({ eyebrow, title, text }) {
  return (
    <article className="card soft-card reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function PersonCard({ role, name, description }) {
  return (
    <article className="card person-card reveal">
      <p className="eyebrow">{role}</p>
      <h3>{name}</h3>
      <p>{description}</p>
    </article>
  )
}



function InvitationGate({ opened, opening, onOpen }) {
  if (opened) return null

  return (
    <div className={opening ? 'invitation-gate gate-opening' : 'invitation-gate'} role="dialog" aria-label="Abrir invitación">
      <div className="gate-panel gate-panel-left"></div>
      <div className="gate-panel gate-panel-right"></div>
      <div className="gate-line"></div>
      <button type="button" className="gate-button" onClick={onOpen} disabled={opening}>
        <span>Abrir</span>
        <span>Invitación</span>
      </button>
    </div>
  )
}

function MusicButton() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(true)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.16
    }
  }, [])

  const playMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      audio.volume = 0.16
      await audio.play()
      setIsPlaying(true)
      setAudioReady(true)
    } catch (error) {
      setAudioReady(false)
      setIsPlaying(false)
    }
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    await playMusic()
  }

  useEffect(() => {
    const handleOpenInvitation = () => {
      playMusic()
    }

    window.addEventListener('open-invitation-music', handleOpenInvitation)
    return () => window.removeEventListener('open-invitation-music', handleOpenInvitation)
  }, [])

  return (
    <div className="music-widget" aria-label="Control de música de fondo">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="metadata"
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioReady(false)}
      />
      <button type="button" className="music-button" onClick={toggleMusic}>
        <span className={isPlaying ? 'music-pulse active' : 'music-pulse'}></span>
        {isPlaying ? 'Pausar música' : 'Activar música'}
      </button>
      {!audioReady && (
        <p className="music-note">
          Agrega el archivo levitate.mp3 en public/audio para activar la música.
        </p>
      )}
    </div>
  )
}

function GraduateCard({ name, index }) {
  return (
    <article className="graduate-card reveal" style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="graduate-avatar" aria-hidden="true">
        <span className="graduate-avatar-badge">{getInitials(name)}</span>
        <div className="graduate-helmet">
          <HelmetIcon />
        </div>
      </div>
      <p>{name}</p>
    </article>
  )
}

export default function App() {
  useReveal()
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [isGateOpening, setIsGateOpening] = useState(false)
  const countdown = useCountdown(EVENT_DATE)

  useEffect(() => {
    document.body.classList.toggle('gate-locked', !isInvitationOpen)
    return () => document.body.classList.remove('gate-locked')
  }, [isInvitationOpen])

  const handleOpenInvitation = () => {
    if (isGateOpening) return

    setIsGateOpening(true)
    window.dispatchEvent(new Event('open-invitation-music'))

    setTimeout(() => {
      setIsInvitationOpen(true)
    }, 2300)
  }

  const details = useMemo(
    () => [
      { eyebrow: 'Fecha', title: '17 de julio de 2026', text: 'Viernes 17 de julio de 2026' },
      { eyebrow: 'Hora', title: '2:30 p. m.', text: 'Hora local de Chilpancingo, Guerrero' },
      { eyebrow: 'Lugar', title: 'Auditorio Sentimientos de la Nación', text: 'Recinto oficial de la ceremonia' },
      { eyebrow: 'Dirección', title: 'Lic. René Juárez Cisneros, 39070', text: 'Chilpancingo de los Bravo, Gro.' },
    ],
    []
  )

  return (
    <div className="page-shell">
      <InvitationGate opened={isInvitationOpen} opening={isGateOpening} onOpen={handleOpenInvitation} />
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <header className="hero wrapper">
        <div className="hero-card reveal visible">
          <div className="hero-image-frame">
            <img
              src="/fotos/facultad-portada.png"
              alt="Edificio de la Facultad de Ingeniería"
              className="hero-cover"
            />
            <div className="hero-image-overlay">
              <span>Facultad de Ingeniería</span>
            </div>
          </div>

          <div className="logo-row">
            <img src="/logos/uagro.png" alt="Escudo de la Universidad Autónoma de Guerrero" />
            <img src="/logos/facultad-ingenieria.png" alt="Logo de la Facultad de Ingeniería" />
          </div>

          <p className="eyebrow center">Universidad Autónoma de Guerrero</p>
          <h1>Ceremonia de Graduación</h1>
          <p className="career">Ingeniero Constructor</p>
          <div className="separator"></div>
          <h2>Generación M.C. Victor Hugo Muñoz García</h2>
          <p className="hero-meta">
            Facultad de Ingeniería · 17 de julio de 2026 · 2:30 p. m. · Auditorio Sentimientos de la Nación
          </p>

          <div className="hero-actions">
            <a href="#invitacion" className="btn btn-dark">Ver invitación</a>
            <a href={MAPS_LINK} className="btn btn-light" target="_blank" rel="noreferrer">Ver ubicación</a>
          </div>

          <div className="scroll-note">Desliza para conocer todos los detalles</div>
        </div>
      </header>

      <main>
        <section id="invitacion" className="wrapper section tone tone-cream">
          <div className="section-box editorial reveal">
            <p className="eyebrow center">Invitación formal</p>
            <h2 className="section-title">Una invitación para celebrar un logro inolvidable</h2>
            <p className="editorial-text">
              La Facultad de Ingeniería de la Universidad Autónoma de Guerrero tiene el honor de invitarle a la ceremonia de graduación de la carrera de Ingeniero Constructor, generación que lleva con orgullo el nombre del M.C. Victor Hugo Muñoz García.
            </p>
            <p className="editorial-subtext">
              Será un momento significativo para reconocer el esfuerzo, la dedicación y los logros alcanzados por los egresados, quienes concluyen una etapa fundamental en su formación profesional.
            </p>
          </div>
        </section>


        <section className="wrapper section compact-top tone tone-mint">
          <div className="section-heading reveal">
            <p className="eyebrow center">Falta para el gran día</p>
            <h2 className="section-title">Cuenta regresiva</h2>
          </div>
          <div className="count-grid reveal">
            <CountBox value={countdown.days} label="Días" />
            <CountBox value={countdown.hours} label="Horas" />
            <CountBox value={countdown.minutes} label="Minutos" />
            <CountBox value={countdown.seconds} label="Segundos" />
          </div>
        </section>

        <section className="wrapper section tone tone-lavender">
          <div className="section-heading reveal">
            <p className="eyebrow center">Información del evento</p>
            <h2 className="section-title">Detalles de la ceremonia</h2>
          </div>
          <div className="grid four-col">
            {details.map((item) => <DetailCard key={item.eyebrow} {...item} />)}
          </div>
        </section>

        <section className="wrapper section tone tone-peach">
          <div className="section-box dedication reveal">
            <p className="eyebrow center">Generación homenaje</p>
            <h2 className="section-title">Una generación que lleva con orgullo un nombre distinguido</h2>
            <p className="editorial-text narrow">
              La presente generación honra con especial aprecio el nombre del <strong>M.C. Victor Hugo Muñoz García</strong>, en reconocimiento a su trayectoria, aportación académica y ejemplo profesional.
            </p>
          </div>
        </section>

        <section className="wrapper section tone tone-blue">
          <div className="section-heading reveal">
            <p className="eyebrow center">Nuestra generación</p>
            <h2 className="section-title">Un recuerdo que permanece</h2>
          </div>
          <div className="group-photo-card reveal">
            <img
              src="/fotos/generacion.jpg"
              alt="Fotografía grupal de la generación en una visita de obra"
              className="group-photo"
            />
            <div className="group-photo-caption">
              <p>
                Una generación unida por el esfuerzo compartido, la experiencia en campo y la pasión por la ingeniería.
              </p>
            </div>
          </div>
        </section>

        <section className="wrapper section tone tone-cream">
          <div className="section-heading reveal">
            <p className="eyebrow center">Integrantes de la generación</p>
            <h2 className="section-title">Compañeros egresados</h2>
          </div>
          <div className="graduates-grid">
            {graduates.map((name, index) => <GraduateCard key={name} name={name} index={index} />)}
          </div>
        </section>

        <section className="wrapper section tone tone-mint">
          <div className="section-heading reveal">
            <p className="eyebrow center">Ceremonia</p>
            <h2 className="section-title">Honorables invitados</h2>
          </div>
          <div className="grid three-col">
            <PersonCard
              role="Padrino de generación"
              name="Lic. Jacinto González Varona"
              description="Acompañará con distinción este acto académico como padrino de la generación."
            />
            <PersonCard
              role="Último pase de lista"
              name="M.I. Christian Hernández Ruiz"
              description="Presidente de la Sociedad Mexicana de Ingeniería Sísmica, A.C., Delegación Guerrero."
            />
            <PersonCard
              role="Invitado de Honor"
              name="M.C. Bonifacio Rayo Mendoza"
              description="Presidente del Honorable Colegio de Ingenieros Civiles “Primer Congreso de Anáhuac” del Estado de Guerrero, A.C."
            />
          </div>
        </section>

        <section className="wrapper section panels-section tone tone-sky">
          <div className="panel reveal">
            <p className="eyebrow">Ubicación del evento</p>
            <h2>Auditorio Sentimientos de la Nación</h2>
            <p>Lic. René Juárez Cisneros, 39070 Chilpancingo de los Bravo, Gro.</p>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn btn-dark">Abrir ubicación</a>
          </div>

          <div className="panel panel-accent reveal">
            <p className="eyebrow">Preguntas y aclaraciones</p>
            <h2>¿Tienes dudas sobre la ceremonia, ubicación o acceso?</h2>
            <p>Si necesitas más información sobre el evento, puedes comunicarte directamente por WhatsApp.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp">Contactar por WhatsApp</a>
          </div>
        </section>
      </main>

      <footer className="wrapper footer section tone tone-peach">
        <div className="section-box footer-box reveal">
          <div className="logo-row mini">
            <img src="/logos/uagro.png" alt="Escudo UAGro" />
            <img src="/logos/facultad-ingenieria.png" alt="Logo Facultad de Ingeniería" />
          </div>
          <p className="footer-quote">“Con orgullo, gratitud y esperanza, celebramos el inicio de una nueva etapa profesional.”</p>
          <div className="separator"></div>
          <p className="footer-meta">
            Ingeniero Constructor<br />
            Facultad de Ingeniería · Universidad Autónoma de Guerrero<br />
            Generación M.C. Victor Hugo Muñoz García
          </p>
        </div>
      </footer>

      <MusicButton />

      <div className="mobile-actions">
        <a href={MAPS_LINK} target="_blank" rel="noreferrer">Ubicación</a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Confirmar</a>
      </div>
    </div>
  )
}
