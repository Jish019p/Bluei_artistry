import { useState, useEffect } from 'react';
import './App.css';

// Lazy initialization function to load from localStorage
const initializeUploadedItems = () => {
  const savedItems = localStorage.getItem('bluieArtistryUploads');
  if (savedItems) {
    try {
      return JSON.parse(savedItems);
    } catch (error) {
      console.error('Error loading saved uploads:', error);
      return [];
    }
  }
  return [];
};

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [uploadedItems, setUploadedItems] = useState<Array<{
    collectionIndex: number;
    name: string;
    imageUrl: string;
    date: string;
  }>>(initializeUploadedItems);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [enlargedImageName, setEnlargedImageName] = useState<string>('');
  const [showCustomOrderModal, setShowCustomOrderModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkType: '',
    description: '',
    quantity: '1',
    budget: '',
    timeline: '',
    additionalNotes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Save data to localStorage whenever uploadedItems changes
  useEffect(() => {
    localStorage.setItem('bluieArtistryUploads', JSON.stringify(uploadedItems));
  }, [uploadedItems]);

  const collections = [
    { name: 'Sketching', subtitle: 'Portraits & more', image: '/images/sketching.jpg' },
    { name: 'Paper Quilling', subtitle: 'Art on cards', image: '/images/paper-quilling.jpg' },
    { name: 'Thread Art', subtitle: '', image: '/images/thread-art.jpg' },
    { name: 'Paper Craft', subtitle: 'Handmade happiness', image: '/images/paper-crafts.jpg' },
    { name: 'Ribbon Bouquets', subtitle: '', image: '/images/ribbon-bouquets.jpg' },
    { name: 'Mud & Clay Art', subtitle: 'Earthy creations', image: '/images/mud-clay.jpg' },
    { name: 'Painting', subtitle: 'Stunning artwork', image: '/images/painting.jpg' }
  ];

  const services = [
    { name: 'Sketching', icon: '✏️' },
    { name: 'Paper Quilling', icon: '🎨' },
    { name: 'Thread Art', icon: '🧵' },
    { name: 'Paper Craft', icon: '📄' },
    { name: 'Ribbon Bouquets', icon: '🎀' },
    { name: 'Mud & Clay Art', icon: '🏺' },
    { name: 'Painting (in Progress)', icon: '🖌️', inProgress: true }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, collectionIndex: number) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newItem = {
              collectionIndex,
              name: file.name.replace(/\.[^/.]+$/, ''),
              imageUrl: event.target.result as string,
              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            };
            setUploadedItems((prevItems) => [...prevItems, newItem]);
          }
        };
        reader.readAsDataURL(file);
      });
      // Clear input
      e.target.value = '';
    }
  };

  const handleDeleteItem = (index: number) => {
    setUploadedItems((prevItems) => 
      prevItems.filter((_, i) => i !== index)
    );
  };

  const handleClearAllUploads = (collectionIndex: number) => {
    setUploadedItems((prevItems) =>
      prevItems.filter((item) => item.collectionIndex !== collectionIndex)
    );
  };

  const handleImageClick = (imageUrl: string, imageName: string) => {
    setEnlargedImage(imageUrl);
    setEnlargedImageName(imageName);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
    setEnlargedImageName('');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*Custom Order Request from Bluie Artistry*

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

*Order Details:*
Artwork Type: ${formData.artworkType}
Description: ${formData.description}
Quantity: ${formData.quantity}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

*Additional Notes:*
${formData.additionalNotes || 'None'}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/919131804780?text=${encodedMessage}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      artworkType: '',
      description: '',
      quantity: '1',
      budget: '',
      timeline: '',
      additionalNotes: ''
    });
    
    // Show success message
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const collectionUploadedItems = selectedCollection !== null 
    ? uploadedItems.filter(item => item.collectionIndex === selectedCollection)
    : [];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer rotating petals */}
            <g className="petal-ring-outer">
              <ellipse cx="40" cy="15" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" />
              <ellipse cx="60" cy="22" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" transform="rotate(60 40 40)" />
              <ellipse cx="65" cy="40" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" transform="rotate(120 40 40)" />
              <ellipse cx="60" cy="58" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" transform="rotate(180 40 40)" />
              <ellipse cx="40" cy="65" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" transform="rotate(240 40 40)" />
              <ellipse cx="20" cy="58" rx="8" ry="12" fill="#ff6b9d" opacity="0.8" transform="rotate(300 40 40)" />
            </g>
            
            {/* Middle petals */}
            <g className="petal-ring-middle">
              <ellipse cx="40" cy="20" rx="6" ry="10" fill="#48c9b0" opacity="0.9" />
              <ellipse cx="55" cy="30" rx="6" ry="10" fill="#48c9b0" opacity="0.9" transform="rotate(72 40 40)" />
              <ellipse cx="60" cy="40" rx="6" ry="10" fill="#48c9b0" opacity="0.9" transform="rotate(144 40 40)" />
              <ellipse cx="55" cy="50" rx="6" ry="10" fill="#48c9b0" opacity="0.9" transform="rotate(216 40 40)" />
              <ellipse cx="40" cy="60" rx="6" ry="10" fill="#48c9b0" opacity="0.9" transform="rotate(288 40 40)" />
            </g>
            
            {/* Inner petals */}
            <g className="petal-ring-inner">
              <ellipse cx="40" cy="25" rx="5" ry="8" fill="#4a90e2" />
              <ellipse cx="50" cy="32" rx="5" ry="8" fill="#4a90e2" transform="rotate(90 40 40)" />
              <ellipse cx="50" cy="48" rx="5" ry="8" fill="#4a90e2" transform="rotate(180 40 40)" />
              <ellipse cx="30" cy="48" rx="5" ry="8" fill="#4a90e2" transform="rotate(270 40 40)" />
            </g>
            
            {/* Center circle with gradient effect */}
            <circle cx="40" cy="40" r="12" fill="#7f7fd5" className="logo-center" />
            <circle cx="40" cy="40" r="10" fill="#4a90e2" className="logo-center-glow" />
            
            {/* Decorative sparkles */}
            <circle cx="40" cy="33" r="1.5" fill="#ffffff" className="sparkle" opacity="0.8" />
            <circle cx="47" cy="40" r="1.5" fill="#ffffff" className="sparkle" opacity="0.8" />
            <circle cx="33" cy="40" r="1.5" fill="#ffffff" className="sparkle" opacity="0.8" />
          </svg>
          <div className="logo-text">
            <span className="brand-name">Bluie</span>
            <span className="brand-sub">ARTISTRY</span>
          </div>
        </div>

        <nav>
          <ul className="nav">
            <li><a href="#home" className={activeNav === 'home' ? 'active' : ''} onClick={() => setActiveNav('home')}>Home</a></li>
            <li><a href="#about" className={activeNav === 'about' ? 'active' : ''} onClick={() => setActiveNav('about')}>About</a></li>
            <li><a href="#collections" className={activeNav === 'collections' ? 'active' : ''} onClick={() => setActiveNav('collections')}>Collections ▾</a></li>
            <li><a href="#custom" className={activeNav === 'custom' ? 'active' : ''} onClick={() => setActiveNav('custom')}>Custom Orders</a></li>
            <li><a href="#contact" className={activeNav === 'contact' ? 'active' : ''} onClick={() => setActiveNav('contact')}>Contact</a></li>
          </ul>
        </nav>

        <a href="https://instagram.com/bluie_artistry" target="_blank" rel="noopener noreferrer" className="instagram-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          @bluie_artistry
        </a>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">Bluie</h1>
          <div className="hero-subtitle">ARTISTRY</div>
          <p className="hero-tagline">Handmade with love,<br />crafted for you. ♡</p>
          <p className="hero-description">
            From delicate paper quilling to thoughtful handmade gifts, each piece is crafted with passion and creativity.
          </p>
          <div className="hero-buttons">
            <a href="#custom" className="btn-secondary" onClick={() => setActiveNav('custom')}>Custom Orders ♡</a>
          </div>
        </div>

        <div className="hero-image">
          <img className="hero-owl" src="/images/owl-mascot.png" alt="Bluie mascot" />

          <div className="meet-blue">
            <h3>Meet Bluie</h3>
            <p>Our little mascot<br />made with paper<br />quilling ♡</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        {/* Decorative flowers */}
        <svg className="flower-decoration flower-1" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g className="bloom-flower">
            <circle cx="30" cy="12" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="45" cy="20" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="48" cy="35" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="40" cy="48" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="25" cy="50" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="12" cy="42" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="10" cy="27" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="18" cy="15" r="6" fill="#ff6b9d" opacity="0.7" />
            <circle cx="30" cy="30" r="8" fill="#48c9b0" />
          </g>
        </svg>

        <div className="about-image">
          <img className="about-owl" src="/images/owl-mascot.png" alt="Bluie mascot" />
        </div>

        <div className="about-content">
          <div className="section-label">ABOUT BLUIE ARTISTRY</div>
          <h2 className="about-title">Where Art Comes<br />to Life ✿</h2>
          <p className="about-description">
            I'm an artist who loves experimenting with different crafting styles, from paper quilling to handmade creations. Every piece you see here is handmade with patience, love and attention to detail. Thank you for supporting handmade!
          </p>
          <a href="https://wa.me/919131804780" target="_blank" rel="noopener noreferrer" className="follow-link" >Chat on WhatsApp ♡</a>

          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <span className="service-icon">{service.icon}</span>
                <span className={service.inProgress ? 'in-progress' : ''}>{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections" id="collections">
        {/* Decorative flowers */}
        <svg className="flower-decoration flower-2" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <g className="rotate-flower">
            <path d="M25 5 Q30 10 28 18 Q25 15 22 18 Q20 10 25 5" fill="#4a90e2" opacity="0.6" />
            <path d="M45 25 Q40 30 32 28 Q35 25 32 22 Q40 20 45 25" fill="#4a90e2" opacity="0.6" />
            <path d="M25 45 Q20 40 22 32 Q25 35 28 32 Q30 40 25 45" fill="#4a90e2" opacity="0.6" />
            <path d="M5 25 Q10 20 18 22 Q15 25 18 28 Q10 30 5 25" fill="#4a90e2" opacity="0.6" />
            <circle cx="25" cy="25" r="6" fill="#7f7fd5" />
          </g>
        </svg>

        <svg className="flower-decoration flower-3" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <g className="pulse-flower">
            <circle cx="25" cy="8" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="40" cy="16" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="42" cy="32" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="32" cy="43" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="18" cy="44" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="8" cy="36" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="6" cy="20" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="16" cy="10" r="5" fill="#ff6b9d" opacity="0.8" />
            <circle cx="25" cy="25" r="7" fill="#48c9b0" />
          </g>
        </svg>

        <div className="section-label">COLLECTIONS</div>
        <h2 className="collections-title">Explore My Handmade Creations ✿</h2>

        <div className="collections-grid">
          {collections.map((item, index) => (
            <div key={index} className="collection-item">
              <img src={item.image} alt={item.name} className="collection-image" />
              <div>
                <div className="collection-name">{item.name}</div>
                {item.subtitle && <div className="collection-subtitle">{item.subtitle}</div>}
              </div>
              <button className="collection-btn" onClick={() => setSelectedCollection(index)}>→</button>
            </div>
          ))}
        </div>

        <button className="view-all-btn">✿ View All Creations</button>
      </section>

      {/* CTA Section */}
      <section className="cta" id="custom">
        {/* Decorative flowers */}
        <svg className="flower-decoration flower-4" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
          <g className="sway-flower">
            <ellipse cx="27.5" cy="10" rx="4" ry="7" fill="#48c9b0" opacity="0.7" />
            <ellipse cx="42" cy="18" rx="4" ry="7" fill="#48c9b0" opacity="0.7" transform="rotate(72 27.5 27.5)" />
            <ellipse cx="40" cy="40" rx="4" ry="7" fill="#48c9b0" opacity="0.7" transform="rotate(144 27.5 27.5)" />
            <ellipse cx="20" cy="42" rx="4" ry="7" fill="#48c9b0" opacity="0.7" transform="rotate(216 27.5 27.5)" />
            <ellipse cx="8" cy="22" rx="4" ry="7" fill="#48c9b0" opacity="0.7" transform="rotate(288 27.5 27.5)" />
            <circle cx="27.5" cy="27.5" r="7" fill="#7f7fd5" />
          </g>
        </svg>

        <div className="cta-content">
          <img className="cta-owl" src="/images/owl-mascot.png" alt="Bluie mascot" />
          <div className="cta-text">
            <h3>Have something special in mind?</h3>
            <p>Let's create something beautiful together! ✿</p>
          </div>
        </div>

        <button className="whatsapp-btn" onClick={() => setShowCustomOrderModal(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Create Custom Order
        </button>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        {/* Decorative flowers */}
        <svg className="flower-decoration flower-5" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g className="bloom-flower-alt">
            <circle cx="30" cy="10" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="48" cy="18" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="50" cy="35" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="40" cy="50" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="22" cy="52" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="10" cy="44" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="8" cy="25" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="18" cy="12" r="5" fill="#ff6b9d" opacity="0.6" />
            <circle cx="30" cy="30" r="8" fill="#4a90e2" />
          </g>
        </svg>

        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#5b4b8a" />
                <circle cx="15" cy="16" r="4" fill="white" />
                <circle cx="25" cy="16" r="4" fill="white" />
              </svg>
              <div className="logo-text">
                <span className="brand-name">Bluie</span>
                <span className="brand-sub">ARTISTRY</span>
              </div>
            </div>
            <p className="footer-tagline">Handmade with love, just for you.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#custom">Custom Orders</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect with me</h4>
            <div className="social-links">
              <a href="https://instagram.com/bluie_artistry" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @bluie_artistry
              </a>
              <a href="https://wa.me/919131804780?text=Hi%20Bluie%20Artistry!%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </div>

          <div className="footer-section">
            <p className="handwritten">Feel free to supporting<br />my handmade! ♡</p>
          </div>
        </div>
      </footer>

      {/* Enlarged Image Preview */}
      {enlargedImage && (
        <>
          <div className="image-preview-backdrop" onClick={handleCloseEnlargedImage}></div>
          <div className="image-preview-modal">
            <button className="preview-close" onClick={handleCloseEnlargedImage}>✕</button>
            <img src={enlargedImage} alt={enlargedImageName} className="preview-image" />
            <p className="preview-name">{enlargedImageName}</p>
          </div>
        </>
      )}

      {/* Collection Modal */}
      {selectedCollection !== null && (
        <>
          <div className="modal-backdrop" onClick={() => setSelectedCollection(null)}></div>
          <div className="collection-modal">
            <button className="modal-close" onClick={() => setSelectedCollection(null)}>✕</button>
            <div className="modal-content">
              <div className="modal-left">
                <img src={collections[selectedCollection].image} alt={collections[selectedCollection].name} className="modal-image" />
                
                <div className="upload-section">
                  <label className="upload-label">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, selectedCollection)}
                      className="upload-input"
                    />
                    <span className="upload-button">+ Upload Artwork</span>
                  </label>
                </div>

                {collectionUploadedItems.length > 0 && (
                  <div className="uploaded-gallery">
                    <div className="gallery-header">
                      <h3 className="gallery-title">My {collections[selectedCollection].name}</h3>
                      <button 
                        className="clear-all-btn"
                        onClick={() => handleClearAllUploads(selectedCollection)}
                        title="Delete all uploads for this collection"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="gallery-grid">
                      {collectionUploadedItems.map((item, index) => (
                        <div key={index} className="gallery-item">
                          <div className="gallery-item-wrapper">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="gallery-image"
                              onClick={() => handleImageClick(item.imageUrl, item.name)}
                              style={{ cursor: 'pointer' }}
                            />
                            <button 
                              className="delete-item-btn"
                              onClick={() => handleDeleteItem(uploadedItems.findIndex(
                                i => i.collectionIndex === item.collectionIndex && 
                                    i.imageUrl === item.imageUrl && 
                                    i.date === item.date
                              ))}
                              title="Delete this item"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="gallery-info">
                            <p className="gallery-name">{item.name}</p>
                            <p className="gallery-date">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-info">
                <h2>{collections[selectedCollection].name}</h2>
                {collections[selectedCollection].subtitle && <p className="modal-subtitle">{collections[selectedCollection].subtitle}</p>}
                <p className="modal-description">Discover the artistry and craftsmanship behind this beautiful collection.</p>
                <div className="modal-stats">
                  <div className="stat">
                    <span className="stat-label">Total Uploads:</span>
                    <span className="stat-value">{collectionUploadedItems.length}</span>
                  </div>
                </div>
                <a href="https://wa.me/919131804780?text=Hi%20Bluie%20Artistry!%20I'm%20interested%20in%20your%20custom%20handmade%20creations." target="_blank" rel="noopener noreferrer" className="modal-cta">Order Now ♡</a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Order Modal */}
      {showCustomOrderModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowCustomOrderModal(false)}></div>
          <div className="custom-order-modal">
            <button className="modal-close" onClick={() => setShowCustomOrderModal(false)}>✕</button>
            
            <div className="custom-order-modal-header">
              <h2>Create Your Custom Order ✿</h2>
              <p>Tell us about your vision and we'll bring it to life!</p>
            </div>

            {formSubmitted && (
              <div className="form-success-message">
                ✓ Your order details have been sent to WhatsApp! We'll respond soon.
              </div>
            )}

            <form className="custom-order-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="artworkType">Artwork Type *</label>
                  <select 
                    id="artworkType" 
                    name="artworkType"
                    value={formData.artworkType}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Sketching">Sketching</option>
                    <option value="Paper Quilling">Paper Quilling</option>
                    <option value="Thread Art">Thread Art</option>
                    <option value="Paper Craft">Paper Craft</option>
                    <option value="Ribbon Bouquets">Ribbon Bouquets</option>
                    <option value="Mud & Clay Art">Mud & Clay Art</option>
                    <option value="Painting">Painting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Project Description *</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe what you'd like us to create. Include details like size, colors, theme, etc."
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget (Optional)</label>
                  <input 
                    type="text" 
                    id="budget" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    placeholder="e.g., ₹500-1000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="timeline">Timeline *</label>
                  <select 
                    id="timeline" 
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
                  <textarea 
                    id="additionalNotes" 
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleFormChange}
                    placeholder="Any other details?"
                    rows={3}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Send on WhatsApp
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
