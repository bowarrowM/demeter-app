const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const dummyNews = [
        {
            title_en: 'Drought Hits Farms Across the Country',
            title_tr: 'Kuraklık Tüm Ülkedeki Çiftlikleri Vurdu',
            content_en: 'Farmers report severe water shortages impacting crop yields.',
            content_tr: 'Çiftçiler, ürün verimini etkileyen ciddi su kıtlıkları bildiriyor.',
            date: new Date('2025-07-20'),
        },
        {
            title_en: 'New Sustainable Agriculture Bill Passed',
            title_tr: 'Yeni Sürdürülebilir Tarım Yasası Kabul Edildi',
            content_en: 'Parliament has passed a bill encouraging eco-friendly farming.',
            content_tr: 'Meclis, çevre dostu tarımı teşvik eden bir yasayı kabul etti.',
            date: new Date('2025-07-18'),
        },
        {
            title_en: 'Record Heatwave Continues in Southern Regions',
            title_tr: 'Güney Bölgelerinde Rekor Sıcaklık Devam Ediyor',
            content_en: 'Temperatures reach unprecedented levels in the south.',
            content_tr: 'Güneyde sıcaklıklar benzeri görülmemiş seviyelere ulaştı.',
            date: new Date('2025-07-15'),
        },
        {
            title_en: 'Organic Produce Demand Rises by 30%',
            title_tr: 'Organik Ürün Talebi %30 Arttı',
            content_en: 'Consumers are increasingly shifting toward organic food.',
            content_tr: 'Tüketiciler giderek daha fazla organik gıdaya yöneliyor.',
            date: new Date('2025-07-13'),
        },
        {
            title_en: 'Floods Damage Hundreds of Greenhouses',
            title_tr: 'Sel Yüzlerce Seraya Zarar Verdi',
            content_en: 'Recent floods have severely affected greenhouse farms.',
            content_tr: 'Son sel felaketleri sera çiftliklerini ciddi şekilde etkiledi.',
            date: new Date('2025-07-10'),
        },
        {
            title_en: 'Government Launches Smart Irrigation Project',
            title_tr: 'Hükümet Akıllı Sulama Projesi Başlattı',
            content_en: 'A new initiative aims to reduce water waste in agriculture.',
            content_tr: 'Yeni girişim, tarımda su israfını azaltmayı hedefliyor.',
            date: new Date('2025-07-05'),
        },
    ]

    for (const news of dummyNews) {
        await prisma.news.create({ data: news })
    }

    console.log('Dummy news added!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
