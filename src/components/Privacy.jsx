import React from 'react'

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
        <p className="mb-4">Última actualización: 30 de enero de 2026</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introducción</h2>
          <p>
            En DJ TEFFO ("nosotros", "nuestro"), respetamos tu privacidad y estamos comprometidos a
            proteger la información personal que compartes con nosotros. Esta Política de Privacidad
            explica qué información recopilamos, cómo la usamos y qué derechos tienes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Información que recopilamos</h2>
          <ul className="list-disc ml-6">
            <li>Información que proporcionas directamente: nombre, correo electrónico y mensaje cuando usas el formulario de contacto.</li>
            <li>Datos técnicos: información del dispositivo, navegador y dirección IP recopilada automáticamente mediante cookies y herramientas de análisis.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Cómo usamos la información</h2>
          <p>
            Usamos la información para responder a tus consultas, prestar y mejorar nuestros servicios,
            enviar comunicaciones relacionadas con reservas y marketing cuando nos das tu consentimiento.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Cookies y tecnologías similares</h2>
          <p>
            Este sitio usa cookies y tecnologías similares para que la experiencia sea más eficiente y
            para recopilar estadísticas de uso. A continuación se describen las categorías principales:
          </p>
          <ul className="list-disc ml-6 mt-3">
            <li>
              <strong>Cookies estrictamente necesarias:</strong> necesarias para el funcionamiento básico del sitio (p. ej. sesiones). No requieren consentimiento.
            </li>
            <li>
              <strong>Cookies de rendimiento/análisis:</strong> recopilan información anónima sobre cómo los visitantes usan el sitio (p. ej. páginas visitadas, errores). Usamos herramientas como Google Analytics para este propósito.
            </li>
            <li>
              <strong>Cookies funcionales:</strong> permiten que el sitio recuerde elecciones que haces (idioma, preferencias) para mejorar la experiencia.
            </li>
            <li>
              <strong>Cookies de publicidad y targeting:</strong> pueden utilizarse para mostrar anuncios relevantes y medir la eficacia de campañas publicitarias.
            </li>
          </ul>

          <p className="mt-3">
            Duración: algunas cookies son de sesión (se eliminan al cerrar el navegador) y otras son persistentes (permanecen durante un periodo determinado). La duración exacta depende de cada cookie.
          </p>

          <p className="mt-3">
            Cookies de terceros: podemos permitir servicios de terceros (por ejemplo, Google Analytics) que colocan cookies para realizar análisis. Estos terceros tienen sus propias políticas de privacidad y opciones para gestionar cookies.
          </p>

          <p className="mt-3">
            Cómo gestionar cookies: puedes gestionar o desactivar las cookies desde la configuración de tu navegador. Ten en cuenta que desactivar cookies puede afectar la funcionalidad del sitio. Además, si ofrecemos un banner de consentimiento, puedes gestionar tus preferencias desde él.
          </p>

          <p className="mt-3">
            Si deseas más información sobre las cookies usadas o quieres ejercer tus derechos sobre los datos, contáctanos a <a href="mailto:djdang45@gmail.com" className="text-dj-gold underline">djdang45@gmail.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Compartir información</h2>
          <p>
            No vendemos tus datos personales. Podemos compartir información con proveedores de servicios
            que nos ayudan a operar el sitio (hosting, análisis, email) y cuando la ley nos lo exige.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad razonables para proteger tu información. Sin embargo, ningún
            método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Tus derechos</h2>
          <p>
            Dependiendo de tu jurisdicción, puedes tener derechos sobre tus datos (acceso, rectificación,
            eliminación, oposición al tratamiento). Para ejercerlos, contáctanos usando los datos siguientes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad, escríbenos a: <a href="mailto:djdang45@gmail.com" className="text-dj-gold underline">djdang45@gmail.com</a>
          </p>
        </section>

        <p className="text-sm text-gray-600">Al usar este sitio aceptas las prácticas descritas en esta Política de Privacidad.</p>
      </div>
    </main>
  )
}
