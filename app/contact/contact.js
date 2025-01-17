import '../../styles/ContactPage.scss';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <main>
        <section className="contact-section">
          <h2>Me contacter</h2>
          <p>
            Vous pouvez me contacter par email à{' '}
            <a href="mailto:abdoulwes@gmail.com">abdoulwes@gmail.com</a>.
          </p>
          <div className="contact-content">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
