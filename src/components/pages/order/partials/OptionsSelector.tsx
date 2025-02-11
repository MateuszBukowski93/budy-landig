const OptionsSelector = () => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-heading-1 mb-6">Opcje dodatkowe</h2>
            
            <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer">
                    <input type="checkbox" id="insulation" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                    <div className="ml-4">
                        <span className="font-medium text-heading-1">Ocieplenie</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Dodatkowa warstwa izolacyjna chroniąca przed zimnem i upałem</p>
                        <span className="text-sm text-primary" id="insulation-price">100 zł</span>
                    </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer">
                    <input type="checkbox" id="legs" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <div className="ml-4">
                        <span className="font-medium text-heading-1">Nóżki</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Podnoszą budę nad poziom podłoża, chroniąc przed wilgocią</p>
                        <span className="text-sm text-primary">50 zł</span>
                    </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer">
                    <input type="checkbox" id="curtain" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <div className="ml-4">
                        <span className="font-medium text-heading-1">Kurtyna</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Elastyczna zasłona chroniąca przed wiatrem i deszczem</p>
                        <span className="text-sm text-primary">50 zł</span>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default OptionsSelector;