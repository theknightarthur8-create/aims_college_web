(function() {
  emailjs.init("FIm2wrr4ViLo2-_DE"); // replace with your EmailJS Public Key
})();

document.getElementById("enquiryForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  emailjs.send("service_dewqqmr", "template_2iuj68j", this)
    .then(function() {
      alert("✅ Enquiry sent successfully! We’ll contact you shortly.");
      document.getElementById("enquiryForm").reset();
    }, function(error) {
      alert("❌ Failed to send enquiry. Please try again.");
      console.error("EmailJS Error:", error);
    });
});