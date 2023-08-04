const dataObjectsSchemaIIN = {
    '00000418': {
        bank: 'LMPS',
        name: 'LAO NATIONAL PAYMENT NETWORK.,LTD',
    },
    '70080418': {
        bank: 'ACLE',
        name: 'ACLEDA BANK LAO.,LTD',
    },
    '70020418': {
        bank: 'APB',
        name: 'AGRICULTURAL PROMOTION BANK',
    },
    '27710418': {
        bank: 'BCEL',
        name: 'BANQUE POUR LE COMMERCE EXTERIEUR LAO PUBLIC',
    },
    '70110418': {
        bank: 'BIC',
        name: 'BANK FOR INVESTMENT AND COMMERCE',
    },
    '70100418': {
        bank: 'BOC',
        name: 'BANK OF CHINA',
    },
    '70070418': {
        bank: 'ICBC',
        name: 'Industrial and Commercial Bank of China Limited',
    },
    '70140418': {
        bank: 'IDB',
        name: 'INDOCHINA BANK LTD',
    },
    '32170418': {
        bank: 'JDB',
        name: 'Joint Development Bank',
    },
    '70030418': {
        bank: 'LDB',
        name: 'Lao Development Bank CO LTD',
    },
    '70050418': {
        bank: 'LVB',
        name: 'LAO - VIET BANK CO., LTD',
    },
    '70040418': {
        bank: 'MJB',
        name: 'MARUHAN Japan Bank Lao Co.,ltd',
    },
    '70130418': {
        bank: 'SACOM',
        name: 'Sacombank Lao',
    },
    '70150418': {
        bank: 'STB',
        name: 'ST Bank Ltd',
    },
    '70170418': {
        bank: 'KBANK',
        name: 'KASIKORNTHAI BANK Limited',
    },
    '70120418': {
        bank: 'VTB',
        name: 'VietinBank Lao limited',
    },
    '29110418': {
        bank: 'PSVB',
        name: 'Phongsavanh Bank Ltd',
    },
    '37160418': {
        bank: 'BFL',
        name: 'Banque Franco Lao Ltd',
    },
    '29110418': {
        bank: 'VMB',
        name: 'Military Commercial Joint Stock Bank - Lao Branch',
    },
};



function getDataObjectIIN(stringId) {
    try {
        let dataObject = dataObjectsSchemaIIN[stringId];
        if (!dataObject) {

        }
        return dataObject;
    } catch (error) {
        return error.message
    }
}


function getDataObjectNameIIN(stringId) {
    try {
        const dataObject = getDataObjectIIN(stringId);
        return dataObject ? dataObject.bank : undefined;
    } catch (error) {
        return error.message
    }
}


module.exports = {
    getDataObjectNameIIN
};