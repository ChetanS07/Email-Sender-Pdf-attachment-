
//folder link : https://drive.google.com/drive/folders/1r9ktqi3yZP5viE2IcF11_gXysK8Vz9Kj?usp=sharing
//Uploading poing API : https://script.google.com/macros/s/AKfycbxzVkQLedL24nBE0e2HM0FH90V588blMX7HxABLMELYJT0qxNVIt5tv4rpQ2vUZLpSGLQ/exec

// FOLDER_ID : 1r9ktqi3yZP5viE2IcF11_gXysK8Vz9Kj
// EMAILJS SERVICE ID : service_0x7cmwh
// EMAILJS TEMPLATE ID : template_pfhjvur
// EMAILJS PUBLIC KEY : SaQxyZztrFr32yaqs

// console.log("Script loaded");

// Initialize EmailJS
(function() {
    emailjs.init("SaQxyZztrFr32yaqs"); // Replace with your EmailJS Public Key
})();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (event) => {
        // console.log("Event listener added to form");
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const pdfFile = document.getElementById("pdfFile").files[0];

        if (!pdfFile) {
            alert("Please select a PDF file!");
            return;
        }

        const reader = new FileReader();

        reader.onload = async function() {
            const base64File = reader.result.split(',')[1];

            const formData = new URLSearchParams();
            formData.append("file", base64File);
            formData.append("filename", pdfFile.name);
            formData.append("type", pdfFile.type);

            try {
                // 1️⃣ Upload to Google Drive via Apps Script
                const response = await fetch("https://script.google.com/macros/s/AKfycbxzVkQLedL24nBE0e2HM0FH90V588blMX7HxABLMELYJT0qxNVIt5tv4rpQ2vUZLpSGLQ/exec", {
                    method: "POST",
                    body: formData
                });

                const driveLink = await response.text();
                console.log("File uploaded:", driveLink);

                if (driveLink.startsWith("Error")) {
                    throw new Error(driveLink);
                }

                // 2️⃣ Send email via EmailJS
                const result = await emailjs.send(
                    "service_0x7cmwh",   // Replace with EmailJS service ID
                    "template_pfhjvur",  // Replace with EmailJS template ID
                    {
                        name,
                        phone,
                        pdf_link: driveLink
                        // pdf_link: "https://example.com/fake-link" // Placeholder link
                    }
                );

                console.log("Email sent:", result);
                alert("PDF uploaded & email sent successfully!");
                form.reset();
            } catch (error) {
                console.error("Error:", error);
                // alert("Upload or email failed.");
                // console.log("Email sending failed"); Email works fine
                console.log("File upload failed");
            }
        };

        reader.readAsDataURL(pdfFile);
    });
});

