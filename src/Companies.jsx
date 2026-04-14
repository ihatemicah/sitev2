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
            <img src={logoAritzia} alt="Aritzia" />
            <img src={logoRedBull} alt="Red Bull" />
            <img src={logoSalesforce} alt="Salesforce" />
            <img src={logoAmazon} alt="Amazon" />
            <img src={logoTYB} alt="TYB" />
            <img src={logoSuperpower} alt="Superpower" />
            <img src={logoRing} alt="Ring" />
        </div>
    </div>
  )
}

export default Companies

