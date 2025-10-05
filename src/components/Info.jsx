function Info() {
    return (
        <div className="lg:flex lg:flex-col lg:w-1/2  lg:items-center lg:justify-between lg:h-full">
            <div className="bg-white border-2 border-violet-300 rounded-md p-2 lg:w-4/5 lg:p-6">
                <h1 className="text-violet-500 font-bold text-xl">Czym jest "JSOSowy ICS"?</h1>
                <span>
                    <span className="text-violet-600">JSOSowy ICS</span> pozwala zmienić plik kalendarzowy z USOS'a na format podobny z JSOS'a.
                    Głównym założeniem jest wyświetlanie lokalizacji zajęć jako sali oraz budynku Politechniki Wrocławskiej
                    zamiast adresu, przez co widgety na urządzeniach mobilnych bedą mogły wyświetlać w wygodny i szybki sposób informację gdzie odbywają się zajęcia.
                </span>
            </div>
            <div className="bg-white border-2 border-violet-300 rounded-md p-2 my-2 lg:w-4/5 lg:p-6 lg:mb-0">
                <h2 className="text-violet-500 font-bold text-xl">Sposób użycia:</h2>
                <span>
                    1. Wklej link do swojego pliku .ics z USOS'a lub wgraj plik ręcznie<br />
                    2. Pobierz nowy plik .ics<br />
                    3. Wgraj nowy plik .ics do swojego kalendarza<br />
                    4. Gotowe!
                </span>
            </div>
        </div>
    );
}

export default Info;