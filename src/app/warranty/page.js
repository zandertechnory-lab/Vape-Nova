export default function WarrantyPage() {
    return (
        <div className="container py-20">
            <h1 className="text-3xl font-bold mb-6">Warranty Information</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p>At VapeFlow, we stand behind the quality of our products. All devices come with a standard 1-year manufacturer warranty covering defects in materials and workmanship.</p>
                <h3>What is covered?</h3>
                <ul>
                    <li>Internal hardware failure</li>
                    <li>Screen display issues</li>
                    <li>Charging port malfunction</li>
                </ul>
                <h3>What is not covered?</h3>
                <ul>
                    <li>Normal wear and tear</li>
                    <li>Water damage</li>
                    <li>Accidental drops or physical damage</li>
                </ul>
            </div>
        </div>
    );
}
