<?php
if (isset($_POST['submit'])) {
    $name = $_POST['contact_name'];
    $mailFrom = $_POST['contact_email'];
    $message = $_POST['contact_message'];

    $email_from = 'anilpiparaiyamaths@gmail.com';
    $email_subject = 'You have recieved an enquiry mail';
    $email_body = "User name: $name.\n" .
        "User email: $mailFrom .\n" .
        "User message: $message.\n";

    $mailTo = "anilkumarpiparaiya@gmail.com";
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-to: $mailFrom \r\n";
    mail($mailTo, $email_subject, $email_body, $headers);
    header("Location: index.html");
}