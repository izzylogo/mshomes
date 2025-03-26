<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email from the form
    $visitor_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    // Set email parameters
    $to = "mshomesbuildings@gmail.com";
    $subject = "New Landlord Inquiry from MSHomes Website";
    
    // Create email message
    $message = "Hello MSHomes,\n\n";
    $message .= "A new potential landlord has expressed interest through your website.\n\n";
    $message .= "Their email address is: " . $visitor_email . "\n\n";
    $message .= "Please contact them to discuss landlord opportunities.\n\n";
    $message .= "Best regards,\nMSHomes Website";
    
    // Additional headers
    $headers = "From: website@mshomes.com\r\n";
    $headers .= "Reply-To: " . $visitor_email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Try to send the email
    if (mail($to, $subject, $message, $headers)) {
        $response = array(
            'status' => 'success',
            'message' => 'Thank you for your interest! We will contact you soon.'
        );
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Sorry, there was an error sending your message. Please try again later.'
        );
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>
