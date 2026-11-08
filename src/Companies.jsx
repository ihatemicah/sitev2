import './Components.css'
import logoAritzia from './assets/company_logos/Aritzia.svg'
import logoRedBull from './assets/company_logos/Red Bull.svg'
import logoSalesforce from './assets/company_logos/Salesforce.svg'
import logoAmazon from './assets/company_logos/Amazon.svg'
import logoTYB from './assets/company_logos/TYB.svg'
import logoSuperpower from './assets/company_logos/Superpower.svg'
import logoRing from './assets/company_logos/Ring.svg'

function Companies() {
  return (
    <div className="companies-container">
      <h3>My creative work has helped </h3>
        <div className='logo-grid'>
            <img src={logoAritzia} alt="Aritzia" loading="lazy" decoding="async" />
            <img src={logoRedBull} alt="Red Bull" loading="lazy" decoding="async" />
            <img src={logoSalesforce} alt="Salesforce" loading="lazy" decoding="async" />
            <img src={logoAmazon} alt="Amazon" loading="lazy" decoding="async" />
            <img src={logoTYB} alt="TYB" loading="lazy" decoding="async" />
            <img src={logoSuperpower} alt="Superpower" loading="lazy" decoding="async" />
            <img src={logoRing} alt="Ring" loading="lazy" decoding="async" />
        </div>
    </div>
  )
}

export default Companies

