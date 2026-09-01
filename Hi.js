/**
 * DeepHat IP to Discord Logger
 * Purpose: Fetches public IP and sends it to a Discord Webhook.
 */
(async function() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1513311385365381263/W4c28Cv7KSv5gaKtSc2jttLrC_5OhA4jAHPJRzWskB1kaxi6PJllf3iE7-Wq1uZvOdz1';

    console.log("[DeepHat] Starting IP extraction and logging...");

    try {
        // 1. Fetch the IP Address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP.');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;

        // 2. Prepare Discord Payload
        const payload = {
            embeds: [{
                title: "🌐 New IP Logged via DeepHat",
                color: 0xFF0000, // Red color in Hex
                description: `A request was triggered via the Bookmarklet tool.`,
                fields: [
                    { name: "Public IP", value: `\`${userIP}\``, inline: true },
                    { name: "Timestamp", value: `\`${new Date().toLocaleString()}\``, inline: true },
                    { name: "Origin", value: `\`${window.location.hostname}\``, inline: false }
                ],
                footer: { text: "DeepHat Security Tooling" }
            }]
        };

        // 3. Send to Discord
        const discordResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (discordResponse.ok) {
            console.log("[DeepHat] IP successfully sent to Discord.");
            alert("Success: IP logged to Discord.");
        } else {
            throw new Error(`Discord API returned status: ${discordResponse.status}`);
        }

    } catch (error) {
        console.error("[DeepHat] Error:", error);
        alert("Error: " + error.message);
    }
})();
