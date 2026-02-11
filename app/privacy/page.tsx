export default function PrivacyPage() {
    return (
        <div className="container section" style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>

            <div style={{ lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    At Luxe Diamond, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
                </p>

                <h3 style={{ color: 'var(--color-primary)', margin: '2rem 0 1rem' }}>Personal Information We Collect</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                </p>

                <h3 style={{ color: 'var(--color-primary)', margin: '2rem 0 1rem' }}>How We Use Your Personal Information</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                </p>

                <h3 style={{ color: 'var(--color-primary)', margin: '2rem 0 1rem' }}>Data Retention</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                </p>
            </div>
        </div>
    );
}
