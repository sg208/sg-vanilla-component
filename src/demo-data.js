// Mock data, but please maintain objects naming (external form contract).
// `imgurl` (optional) shows a logo image; without it the bank gets a
// lettered mark. The old logo host (portal.bp.nu) no longer answers.
export const demoData = {
  providers: [
    { name: "ABN AMRO", id: "ABNANL2A" },
    { name: "ASN Bank", id: "ASNBNL21" },
    { name: "bunq", id: "BUNQNL2A" },
    { name: "Handelsbanken", id: "HANDNL2A" },
    { name: "ING", id: "INGBNL2A" },
    { name: "Knab", id: "KNABNL2H" },
    { name: "Rabobank", id: "RABONL2U" },
    { name: "SNS", id: "SNSBNL2A" },
    { name: "Triodos Bank", id: "TRIONL2U" },
    { name: "Van Lanschot", id: "FVLBNL22" },
  ],
  options: {
    isError: false,
    amountToCharge: 9900, // number, represent cents
    minimumCharge: 8888, // number || null, represent cents
    locale: "nl-NL", // string (optional), default is "nl-NL"
    currency: "eur", // string (optional), default is "eur"
    hash: "xxxxxxxxxxxxxxxxx", // string, apply this to hidden formfield
    tracker: "yyyyyyyyyyyyyyyyy", // string, apply this to hidden formfield
  },
}
