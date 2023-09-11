const verificationMail = function (confLink) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #000000;
            margin: 0;
            padding: 0;

        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #1d0075;
            color: #fca35a;
            padding: 20px 0;
            text-align: center;
        }

        .content {
            background-color: #fff;
            padding: 20px;
        }

        h1 {
            font-size: 24px;
        }

        p {
            font-size: 16px;
            margin-bottom: 20px;
        }

        a {
            color: #0073e6;
            text-decoration: none;
        }

        button {
            width: 120px;
            height: 60px;
            border: none;
            border-radius: 20px;
            background-color: #1d0075;
            color: #fca35a;
            font-size: inherit;
            font-weight: bold;
            display: block;
            margin: 0 auto;
        }

        .footer {
            background-color: #1d0075;
            color: #fca35a;
            text-align: center;
            font-size: small;
            padding: 10px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Trello Task</h1>
        </div>
        <div class="content">
            <h2 style="text-align: center;">Verify your Email</h2>
            <p>You're well on your way to setting up your account profile, We just need to verify you email. click the
                button below to let us know this is really you.</p>
            <!-- Add an SVG image -->
            <img src="https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-5400.jpg?w=1060&t=st=1694296696~exp=1694297296~hmac=318492b9bc171764e3cb466f9477427a3ef3e51a724a4f618f9cd457b944ffa7" style="display: block; width: 300px; margin: 0 auto;">
            <p><a href="${confLink}" target="_blank"><button>Verify</button></a>
            </p>
        </div>
        <div class="footer">
            © 2023 Your Company. All rights reserved.
        </div>
    </div>
</body>

</html>`;
};

export default verificationMail;
