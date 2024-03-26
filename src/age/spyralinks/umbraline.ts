import { Spyralink } from "../classes/spyralink"

export const Umbraline = new Spyralink({
    id: 'spyralink__umbraline',
    name: `Umbraline`,
    description: `Umbraline is a majestic beast which is an evolved derivative of a shadow cat with a sleek, black fur coat and iridescent scales. Its golden eyes shine with intelligence and its ability to blend into shadows allows it to cover large distances swiftly and stealthily.`,
    type:'hostile',
    image:'umbraline.jpeg',
    use_text:'With a swift motion from the tattoo on your arm, Umbraline materializes from the shadows. You leap onto its back, and together you dissolve into the darkness, traversing great distances in mere whispers of time.',
    element:"bloom",
    skills: [{
        name:'Shadow Prowl',
        description:'The Umbraline mends into the shadows and prowls on the enemy when they are vulnerable.'
    }]

})