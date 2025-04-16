import React from "react";

const FAQSection = ({ faqOpen, toggleFAQ, answerRefs }) => {
  const faqs = [
    {
      question: "WHEN DOES THE EVENT RUN?",
      answer:
        "The MUJ Unity Fest will run from April 15-17, 2025. The event starts at 9:00 AM on the first day and concludes at 6:00 PM on the final day.",
    },
    {
      question: "WHERE DOES THE EVENT RUN?",
      answer:
        "The event will be held at the Manipal University Jaipur campus in the main auditorium and surrounding areas.",
    },
    {
      question: "HOW DO I REGISTER FOR COMPETITIONS?",
      answer:
        "You can register for competitions through our website by creating an account and selecting the competitions you wish to participate in. Registration closes one week before the event starts.",
    },
    {
      question: "ARE THERE ACCOMMODATION OPTIONS?",
      answer:
        "Yes, limited on-campus accommodation is available for participants coming from other cities. Please contact the organizing team for more details and bookings.",
    },
  ];

  return (
    <section className="faq-section" data-aos="fade-up">
      <div className="container">
        <h2>
          Frequently <span className="highlight">asked</span> questions
        </h2>

        <div className="accordion">
          {faqs.map((item, index) => (
            <div
              className="accordion-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={index}
            >
              <button className="accordion-button" onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                <span className="accordion-icon">{faqOpen === index ? "−" : "+"}</span>
              </button>
              <div
                className="accordion-content"
                ref={(el) => (answerRefs.current[index] = el)}
                style={{
                  maxHeight: faqOpen === index ? `${answerRefs.current[index]?.scrollHeight}px` : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p style={{ padding: "10px 0" }}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
