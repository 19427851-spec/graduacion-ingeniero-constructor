import { useEffect, useMemo, useRef, useState } from 'react'

const EVENT_DATE = new Date('2026-07-17T14:30:00-06:00')
const MAPS_LINK = 'https://maps.app.goo.gl/P5cGigVectswn2Jr8'
const WHATSAPP_LINK = 'https://wa.me/527472736556'
const MUSIC_SRC = '/audio/levitate.mp3'
const MALE_ICON = '/icons/hombre.png'
const FEMALE_ICON = '/icons/mujer.png'

const graduates = [
  { name: 'ALAN YAHIR SALDAÑA RENDON', gender: 'male' },
  { name: 'BARDO ALEJANDRO TERRAZAS LINARES', gender: 'male' },
  { name: 'DALIA MORALES GONZALEZ', gender: 'female' },
  { name: 'ELIZABETH FRANCISCO POBLANO', gender: 'female' },
  { name: 'EMANUEL VELAZQUEZ BASURTO', gender: 'male' },
  { name: 'EVELIN ANET GARIBAY NAVARRETE', gender: 'female' },
  { name: 'FRIDA VICTORIA BERNAL LÓPEZ', gender: 'female' },
  { name: 'ITZEL MARCELINA CALDERON LEYVA', gender: 'female' },
  { name: 'JENNIFER FIGUEROA LUNA', gender: 'female' },
  { name: 'JOSE ALFREDO PÉREZ CAMARGO', gender: 'male' },
  { name: 'JOSE MANUEL BRAVO MEJIA', gender: 'male' },
  { name: 'JOSELIN MAXIMILIANO JERONIMO', gender: 'female' },
  { name: 'JUAN CARLOS ALBERTO CASTILLO RADILLA', gender: 'male' },
  { name: 'JULIO CESAR ORTIZ HERNANDEZ', gender: 'male' },
  { name: 'KENIA YOSELIN LEYVA HERNANDEZ', gender: 'female' },
  { name: 'LUIS ANGEL CASTRO ORTIZ', gender: 'male' },
  { name: 'MILTON ARMANDO RAMOS MORALES', gender: 'male' },
  { name: 'VICTOR HUGO CHAVELAS CASTRO', gender: 'male' },
]

const philosophicalQuotes = [
  { text: 'Quien tiene un porqué para vivir, puede soportar casi cualquier cómo.', author: 'Friedrich Nietzsche' },
  { text: 'La verdadera sabiduría está en reconocer la propia ignorancia.', author: 'Sócrates' },
  { text: 'No es la muerte lo que el hombre debe temer, sino no empezar nunca a vivir.', author: 'Marco Aurelio' },
  { text: 'El hombre está condenado a ser libre.', author: 'Jean-Paul Sartre' },
  { text: 'La vida solo puede ser comprendida mirando hacia atrás, pero ha de ser vivida mirando hacia adelante.', author: 'Søren Kierkegaard' },
  { text: 'Aquel que domina a otros es fuerte; aquel que se domina a sí mismo es poderoso.', author: 'Lao Tse' },
  { text: 'Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito.', author: 'Aristóteles' },
  { text: 'La felicidad de tu vida depende de la calidad de tus pensamientos.', author: 'Marco Aurelio' },
  { text: 'Todo hombre muere, pero no todo hombre vive realmente.', author: 'William Wallace' },
  { text: 'El sufrimiento deja de ser sufrimiento en el momento en que encuentra un sentido.', author: 'Viktor Frankl' },
  { text: 'La libertad no consiste en hacer lo que se quiere, sino en tener el derecho de hacer lo que se debe.', author: 'Montesquieu' },
  { text: 'El que tiene paz en su conciencia lo tiene todo.', author: 'Don Bosco' },
  { text: 'Nadie se baña dos veces en el mismo río, porque ni el río ni la persona son los mismos.', author: 'Heráclito' },
  { text: 'La peor lucha es la que no se hace.', author: 'Karl Marx' },
  { text: 'Conocerse a sí mismo es el principio de toda sabiduría.', author: 'Aristóteles' },
  { text: 'El alma se tiñe del color de sus pensamientos.', author: 'Marco Aurelio' },
  { text: 'La esperanza es el sueño del hombre despierto.', author: 'Aristóteles' },
  { text: 'Solo quien ha atravesado la oscuridad puede valorar verdaderamente la luz.', author: 'Inspirada en el pensamiento existencialista' },
]

const presidiumGuests = [
  {
    role: 'Presidente del Comité Ejecutivo Estatal de Morena en Guerrero',
    name: 'Lic. Jacinto González Varona',
  },
  {
    role: 'Director de la Facultad de Ingeniería',
    name: 'Dr. Joaquín Hernández Rodríguez',
  },
  {
    role: 'Jefe de Oficina de Rectoría de la Universidad Autónoma de Guerrero',
    name: 'Mtro. Oscar Javier Arcos Fuentes',
  },
  {
    role: 'Presidente de la Sociedad Mexicana de Ingeniería Sísmica, A.C., Delegación Guerrero',
    name: 'M.I. Christian Hernández Ruiz',
  },
  {
    role: 'Presidente del Honorable Colegio de Ingenieros Civiles “Primer Congreso de Anáhuac” del Estado de Guerrero, A.C.',
    name: 'M.C. Bonifacio Rayo Mendoza',
  },
  {
    role: 'Docente del Programa Educativo de Ingeniero Topógrafo y Geomático',
    name: 'Dr. René Vázquez Jiménez',
  },
  {
    role: 'Coordinador del Programa Educativo de Ingeniero en Computación',
    name: 'M.C. Félix Molina Ángel',
  },
  {
    role: 'Coordinadora del Programa Educativo de Ingeniero Topógrafo y Geomático',
    name: 'Dr. Rocío Nayelly Ramos Bernal',
  },
  {
    role: 'Docente de la Facultad de Ingeniería',
    name: 'M.C. Eric Rodriguez Peralta',
  },
  {
    role: 'Invitado de honor que da nombre a la generación',
    name: 'M.C. Victor Hugo Muñoz García',
  },
]

const ceremonyProgram = [
  {
    time: '2:00 p. m.',
    activity: 'Recepción de invitados',
    featured: true,
  },
  {
    activity: 'Honores a la bandera a cargo de la 35 Z/M',
  },
  {
    activity: 'Entonación del Himno Universitario a cargo del maestro(a) de ceremonias',
  },
  {
    activity: 'Presentación del presídium por parte del maestro(a) de ceremonias',
  },
  {
    activity: 'Mensaje de bienvenida por el director de la Facultad de Ingeniería',
    description: 'Dr. Joaquín Hernández Rodríguez',
  },
  {
    activity: 'Mensaje del M.C. Victor Hugo Muñoz García, a quien la generación distingue llevando su nombre',
  },
  {
    activity: 'Palabras de despedida',
    description: 'A cargo de la Ingeniera en Computación Zayda Rosalia Muñiz del Valle y el Ingeniero Constructor Victor Hugo Chavelas Castro.',
  },
  {
    activity: 'Entrega de reconocimientos a los mejores promedios de la generación 2022-2026',
  },
  {
    activity: 'Último pase de lista',
    details: [
      'Grupo 801 del Programa Educativo Ingeniero Constructor, a cargo del M.I. Christian Hernández Ruiz.',
      'Grupo 901 del Programa Educativo Ingeniero en Computación, a cargo del M.C. Félix Molina Ángel.',
      'Grupo 801 del Programa Educativo Ingeniero Topógrafo y Geomático, a cargo del Dr. René Vázquez Jiménez.',
    ],
  },
  {
    activity: 'Mensaje y clausura por parte del Presidente del Comité Ejecutivo Estatal de Morena en Guerrero',
    description: 'Lic. Jacinto González Varona',
  },
  {
    activity: 'Foto oficial',
  },
]

const generationPhotos = [
  {
    src: '/fotos/generacion.jpg',
    alt: 'Fotografía grupal de la generación en una visita de obra',
  },
  {
    src: '/fotos/generacion-oficial.jpg',
    alt: 'Fotografía oficial de la generación',
  },
  {
    src: '/fotos/generacion-toga.jpg',
    alt: 'Fotografía de la generación con toga y birrete',
  },
]

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

function CeremonyLaunchCard({ title, accent, onClick }) {
  return (
    <button
      type="button"
      className={`ceremony-launch-card ${accent}`}
      onClick={onClick}
    >
      <span className="ceremony-launch-glow" aria-hidden="true"></span>
      <span className="ceremony-launch-title">{title}</span>
      <span className="ceremony-launch-footer">
        Tocar para abrir
        <span aria-hidden="true">↗</span>
      </span>
    </button>
  )
}

function CeremonyInfoModal({ section, onClose }) {
  if (!section) return null

  const isPresidium = section === 'presidium'
  const title = isPresidium ? 'Presídium' : 'Programa'
  return (
    <div className="ceremony-modal-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="ceremony-modal-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="graduate-modal-close" onClick={onClose} aria-label="Cerrar ventana">
          ×
        </button>

        <div className="ceremony-modal-header">
          <span className="ceremony-modal-badge">Ceremonia</span>
          <h3>{title}</h3>
        </div>

        {isPresidium ? (
          <div className="presidium-elegant-list">
            {presidiumGuests.map((guest) => (
              <article className="presidium-elegant-item" key={guest.name}>
                <span className="presidium-mark" aria-hidden="true">✦</span>
                <div>
                  <h4>{guest.name}</h4>
                  <p>{guest.role}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="program-elegant-flow">
            {ceremonyProgram.map((item) => (
              <article className={item.featured ? 'program-elegant-item featured' : 'program-elegant-item'} key={item.activity}>
                <span className="program-mark" aria-hidden="true">{item.featured ? '2:00 p. m.' : '◆'}</span>
                <div>
                  <h4>{item.activity}</h4>
                  {item.description && <p>{item.description}</p>}
                  {item.details && (
                    <div className="program-detail-list">
                      {item.details.map((detail) => <span key={detail}>{detail}</span>)}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
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


function GraduateCard({ graduate, index, onSelect }) {
  const iconSrc = graduate.gender === 'female' ? FEMALE_ICON : MALE_ICON
  const iconAlt = graduate.gender === 'female' ? 'Icono de ingeniera' : 'Icono de ingeniero'

  return (
    <button
      type="button"
      className="graduate-card reveal"
      style={{ transitionDelay: `${index * 90}ms` }}
      onClick={() => onSelect({ ...graduate, index })}
    >
      <div className="graduate-avatar" aria-hidden="true">
        <img src={iconSrc} alt={iconAlt} className="graduate-avatar-image" />
      </div>
      <p>{graduate.name}</p>
    </button>
  )
}

function GraduateModal({ graduate, onClose }) {
  if (!graduate) return null

  const iconSrc = graduate.gender === 'female' ? FEMALE_ICON : MALE_ICON
  const iconAlt = graduate.gender === 'female' ? 'Icono de ingeniera' : 'Icono de ingeniero'
  const quote = philosophicalQuotes[graduate.index % philosophicalQuotes.length]

  return (
    <div className="graduate-modal-overlay" role="dialog" aria-modal="true" aria-label={`Frase de ${graduate.name}`} onClick={onClose}>
      <div className="graduate-modal-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="graduate-modal-close" onClick={onClose} aria-label="Cerrar ventana">
          ×
        </button>

        <div className="graduate-modal-icon">
          <img src={iconSrc} alt={iconAlt} />
        </div>

        <h3>{graduate.name}</h3>
        <div className="separator"></div>
        <blockquote>
          “{quote.text}”
        </blockquote>
        <p className="graduate-modal-author">— {quote.author}</p>
      </div>
    </div>
  )
}

function PhotoGalleryModal({ photoIndex, onClose, onNavigate }) {
  if (photoIndex === null) return null

  const photo = generationPhotos[photoIndex]

  return (
    <div className="photo-modal-overlay" role="dialog" aria-modal="true" aria-label="Galería de fotografías" onClick={onClose}>
      <div className="photo-modal-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="graduate-modal-close" onClick={onClose} aria-label="Cerrar galería">
          ×
        </button>
        <button type="button" className="photo-modal-arrow photo-modal-prev" onClick={() => onNavigate('prev')} aria-label="Foto anterior">
          ‹
        </button>
        <img src={photo.src} alt={photo.alt} className="photo-modal-image" />
        <button type="button" className="photo-modal-arrow photo-modal-next" onClick={() => onNavigate('next')} aria-label="Foto siguiente">
          ›
        </button>
        <div className="photo-modal-dots" aria-hidden="true">
          {generationPhotos.map((item, index) => (
            <span key={item.src} className={index === photoIndex ? 'active' : ''}></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  useReveal()
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [isGateOpening, setIsGateOpening] = useState(false)
  const [selectedGraduate, setSelectedGraduate] = useState(null)
  const [selectedCeremonyInfo, setSelectedCeremonyInfo] = useState(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
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

  const navigatePhoto = (direction) => {
    setSelectedPhotoIndex((current) => {
      if (current === null) return current
      if (direction === 'next') return (current + 1) % generationPhotos.length
      return (current - 1 + generationPhotos.length) % generationPhotos.length
    })
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedGraduate(null)
        setSelectedCeremonyInfo(null)
        setSelectedPhotoIndex(null)
      }

      if (event.key === 'ArrowRight' && selectedPhotoIndex !== null) navigatePhoto('next')
      if (event.key === 'ArrowLeft' && selectedPhotoIndex !== null) navigatePhoto('prev')
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedPhotoIndex])

  const details = useMemo(
    () => [
      { eyebrow: 'Fecha', title: '17 de julio de 2026', text: 'Viernes 17 de julio de 2026' },
      { eyebrow: 'Hora', title: '2:30 p. m.', text: 'Hora local de Chilpancingo, Guerrero' },
      { eyebrow: 'Lugar', title: 'Auditorio José Joaquín Herrera', text: 'Recinto oficial de la ceremonia' },
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
            Facultad de Ingeniería · 17 de julio de 2026 · 2:30 p. m. · Auditorio José Joaquín Herrera
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
          <div className="memories-gallery reveal">
            {generationPhotos.map((photo, index) => (
              <button
                type="button"
                className={index === 0 ? 'memory-photo-card featured' : 'memory-photo-card'}
                key={photo.src}
                onClick={() => setSelectedPhotoIndex(index)}
                aria-label={`Abrir fotografía ${index + 1}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>
        </section>

        <section className="wrapper section tone tone-cream">
          <div className="section-heading reveal">
            <p className="eyebrow center">Integrantes de la generación</p>
            <h2 className="section-title">Compañeros egresados</h2>
          </div>
          <div className="graduates-grid">
            {graduates.map((graduate, index) => <GraduateCard key={graduate.name} graduate={graduate} index={index} onSelect={setSelectedGraduate} />)}
          </div>
        </section>

        <section className="wrapper section tone tone-mint">
          <div className="section-heading reveal">
            <h2 className="section-title ceremony-main-title">Ceremonia</h2>
          </div>

          <div className="ceremony-showcase-grid reveal">
            <CeremonyLaunchCard
              title="Presídium"
              accent="presidium-accent"
              onClick={() => setSelectedCeremonyInfo('presidium')}
            />
            <CeremonyLaunchCard
              title="Programa"
              accent="program-accent"
              onClick={() => setSelectedCeremonyInfo('program')}
            />
          </div>
        </section>

        <section className="wrapper section panels-section tone tone-sky">
          <div className="panel reveal">
            <p className="eyebrow">Ubicación del evento</p>
            <h2>Auditorio José Joaquín Herrera</h2>
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

      <GraduateModal graduate={selectedGraduate} onClose={() => setSelectedGraduate(null)} />
      <CeremonyInfoModal section={selectedCeremonyInfo} onClose={() => setSelectedCeremonyInfo(null)} />
      <PhotoGalleryModal
        photoIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={navigatePhoto}
      />

      <MusicButton />

      <div className="mobile-actions">
        <a href={MAPS_LINK} target="_blank" rel="noreferrer">Ubicación</a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Confirmar</a>
      </div>
    </div>
  )
}
