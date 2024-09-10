import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_ptyw83g';
    const templateId = 'template_ot8xenv';
    const publicKey = 'CrbTsRDN14ypYcAev';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'rinsha',
      message: message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((res) => {
        console.log('Email sent successfully:', res);
        alert('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.log('Error sending email:', err);
        alert('Failed to send your message. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-5 mb-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          cols="20"
          rows="5"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
      >
        Send Email
      </button>
    </form>
  );
};

export default Contact;
