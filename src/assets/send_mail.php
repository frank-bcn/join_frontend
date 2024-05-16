<?php

########### CONFIG ###############

$recipient = 'info@frank-sinnigen.de'; # Bitte hier deine E-Mail angeben
$redirect = 'success.html';

########### CONFIG END ###########



########### Instruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST request to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

if (empty($recipient)) {
    die("Bitte geben Sie die E-Mail-Adresse in Zeile 5 an.");
}

header('Content-Type: text/html; charset=utf-8');
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


function encodeEmailText($text) {
    return $text; // Keine Änderungen an der Kodierung vornehmen
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    // Prüfen, ob die erforderlichen Felder vorhanden sind
    if (isset($_POST['email'])) {
        $email = $_POST['email'];

        // Überprüfen, ob die E-Mail-Adresse gültig ist
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $subject = " - E-Mail: " . $email;
            $headers = "From: $email";

            // Keine Kodierung der Betreff und Nachricht mehr notwendig

            if (mail($recipient, $subject, $message, $headers)) {
                // Erfolgreich versendet, sende Bestätigung
                echo "gesendet";

                // Bestätigungs-E-Mail an den Absender senden
                $confirmationSubject = "Thank you";
                $confirmationMessage = "Vielen Dank! Ich melde mich zeitnah bei Ihnen.\n\nThank you! I'll get in touch with you promptly.\n\nGracias! Me pondré en contacto contigo a la mayor brevedad.\n\nBest regards, Frank Sinnigen";

                $confirmationHeaders = "From: $recipient";
                mail($email, $confirmationSubject, $confirmationMessage, $confirmationHeaders);
            } else {
                // Fehler beim Versenden
                echo "fehler";
            }
        } else {
            echo "ungültige_email";
        }
    } else {
        echo "fehlende_felder";
    }
} else {
    header("Allow: POST", true, 405);
    exit;
}
?>