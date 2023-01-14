const mjml = require("mjml");

exports.resetPasswordTemplate = (link) => {
    
    const htmlOutput = mjml(`
    <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
                <mj-button href="${link}" font-family="Helvetica" background-color="#0dba6a" color="white">
                    Reset your password here!
                </mj-button>
            </mj-column>
        </mj-section>
        </mj-body>
    </mjml>
    `);

    return htmlOutput.html;
}