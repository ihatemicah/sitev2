import './Components.css'
import GalleryCard from './GalleryCard.jsx'
import { creativeAiCategories, creativeAiImages, creativeProofOfLife } from './portfolioMedia.js'

function CreativeCanvas() {
    return (
        <div className="creative-canvas">
            <GalleryCard
                title="AI Creations"
                description="Leveraging advanced AI workflows to create bespoke, brand-aligned visual assets that elevate your identity."
                items={creativeAiImages}
                categories={creativeAiCategories}
            />
            <GalleryCard title="Proof of life" items={creativeProofOfLife} />
        </div>
    )
}

export default CreativeCanvas
