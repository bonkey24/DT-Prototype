export const STATIONS = [
  { code: 'SBC', name: 'Bengaluru City Jn (SBC)' },
  { code: 'NDLS', name: 'New Delhi (NDLS)' },
  { code: 'CSMT', name: 'Mumbai CSMT (CSMT)' },
  { code: 'MAS', name: 'Chennai Central (MAS)' },
  { code: 'HWH', name: 'Howrah Jn (HWH)' },
  { code: 'HYB', name: 'Hyderabad (HYB)' },
  { code: 'NZM', name: 'Delhi Hazrat Nizamuddin (NZM)' },
]

export const QUOTAS = [
  { code: 'SS', label: 'Senior Citizen / Lower Berth' },
  { code: 'GN', label: 'General (GN)' },
  { code: 'LD', label: 'Ladies (LD)' },
  { code: 'CK', label: 'Tatkal (CK)' },
  { code: 'PT', label: 'Premium Tatkal (PT)' },
]

export const CLASS_FILTERS = [
  { code: 'ALL', label: 'All Classes (SL, 3A, 2A, 1A, CC, 2S)' },
  { code: '3A', label: 'AC 3 Tier (3A) - Popular' },
  { code: '2A', label: 'AC 2 Tier (2A) - Extra comfort' },
  { code: '1A', label: 'AC 1st Class (1A) - Coupe' },
  { code: 'CC', label: 'AC Chair Car (CC)' },
  { code: 'SL', label: 'Sleeper (SL)' },
  { code: '2S', label: 'Second Sitting (2S)' },
]

export const BERTH_PREFERENCES = [
  {
    value: 'Lower Berth',
    label: 'Lower Berth',
    badge: 'Recommended for Senior Citizens',
    description:
      'Floor-level berth with no climbing required. Easy access to doorway and washroom.',
  },
  {
    value: 'Middle Berth',
    label: 'Middle Berth',
    description: 'Foldable intermediate berth.',
  },
  {
    value: 'Upper Berth',
    label: 'Upper Berth',
    description: 'Top-tier quiet bunk.',
  },
  {
    value: 'Side Lower',
    label: 'Side Lower',
    description: 'Window seat with direct aisle view.',
  },
  {
    value: 'Side Upper',
    label: 'Side Upper',
    description: 'Top aisle bunk.',
  },
  {
    value: 'No Preference',
    label: 'No Preference',
    description: 'Any available confirmed berth on this train.',
  },
]

export const UPI_APPS = [
  { id: 'GPay', label: 'GPay', defaultVpa: 'debopriya@oksbi' },
  { id: 'PhonePe', label: 'PhonePe', defaultVpa: '9845012345@ybl' },
  { id: 'Paytm', label: 'Paytm', defaultVpa: '9845012345@paytm' },
  { id: 'BHIM UPI', label: 'BHIM UPI', defaultVpa: 'debopriya@upi' },
]

export const BANKS = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Punjab National Bank (PNB)',
  'Axis Bank',
  'Bank of Baroda',
]

export const TRAINS = [
  {
    id: 'tr-22691',
    number: '22691',
    name: 'SBC NDLS Rajdhani Express',
    serviceBadge: 'Direct Superfast • Meals Included',
    punctuality: '99% On Time',
    runsOn: 'M T W T F S S (All Days)',
    departureTime: '20:00',
    departureStation: 'Bengaluru City Jn (SBC)',
    departurePlatform: 'Platform 8 (Lift & Battery Car)',
    arrivalTime: '05:55',
    arrivalDayOffset: '+2 days',
    arrivalStation: 'New Delhi (NDLS)',
    arrivalPlatform: 'Platform 3 (Level Access)',
    duration: '33 hrs 55 mins',
    defaultClass: '3A',
    classes: [
      {
        code: '3A',
        label: '3A (AC 3 Tier)',
        description: 'Comfortable AC berth with linen & meals.',
        price: 2845,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 42',
        seatsLeft: 42,
      },
      {
        code: '2A',
        label: '2A (AC 2 Tier)',
        description: 'Spacious 4-berth bay with reading lights.',
        price: 4120,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 18',
        seatsLeft: 18,
      },
      {
        code: '1A',
        label: '1A (First AC)',
        description: 'Lockable private coupe / cabin with attendant.',
        price: 6980,
        statusType: 'RAC',
        statusText: 'RAC 4 (Reservation Against Cancellation)',
        seatsLeft: 4,
      },
    ],
  },
  {
    id: 'tr-12627',
    number: '12627',
    name: 'Karnataka Express',
    serviceBadge: 'Direct Superfast • Daily Favorite',
    punctuality: '97% Reliability',
    runsOn: 'M T W T F S S (All Days)',
    departureTime: '19:20',
    departureStation: 'Bengaluru City Jn (SBC)',
    departurePlatform: 'Platform 1 (Main Entrance Lift)',
    arrivalTime: '09:00',
    arrivalDayOffset: '+2 days',
    arrivalStation: 'New Delhi (NDLS)',
    arrivalPlatform: 'Platform 4 (Ramp Access)',
    duration: '37 hrs 40 mins',
    defaultClass: 'SL',
    classes: [
      {
        code: 'SL',
        label: 'SL (Sleeper)',
        description: 'Classic non-AC sleeper with wide window breeze.',
        price: 765,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 86',
        seatsLeft: 86,
      },
      {
        code: '3A',
        label: '3A (AC 3 Tier)',
        description: 'Air-conditioned 3-tier sleeper with bedroll.',
        price: 2010,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 24',
        seatsLeft: 24,
      },
      {
        code: '2A',
        label: '2A (AC 2 Tier)',
        description: 'Spacious curtained berths with pantry catering.',
        price: 2940,
        statusType: 'WL',
        statusText: 'WL 8 (Waitlist)',
        seatsLeft: 0,
      },
    ],
  },
  {
    id: 'tr-12649',
    number: '12649',
    name: 'Sampark Kranti Express',
    serviceBadge: 'Direct • Limited Stops',
    punctuality: '98% On Time',
    runsOn: 'M • W • F • S',
    departureTime: '13:50',
    departureStation: 'Bengaluru (YPR / SBC)',
    departurePlatform: 'Platform 6 (Step-Free)',
    arrivalTime: '00:10',
    arrivalDayOffset: '+2 days',
    arrivalStation: 'Delhi Hazrat Nizamuddin (NZM)',
    arrivalPlatform: 'Platform 2 (Lift to exit)',
    duration: '34 hrs 20 mins',
    defaultClass: '3A',
    classes: [
      {
        code: 'SL',
        label: 'SL (Sleeper)',
        description: 'Budget reserved sleeper berths.',
        price: 740,
        statusType: 'RAC',
        statusText: 'RAC 12 (Reservation Against Cancellation)',
        seatsLeft: 12,
      },
      {
        code: '3A',
        label: '3A (AC 3 Tier)',
        description: 'Air conditioned with fresh bedrolls included.',
        price: 1980,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 15',
        seatsLeft: 15,
      },
      {
        code: '2A',
        label: '2A (AC 2 Tier)',
        description: 'Wide comfortable upper & lower berths.',
        price: 2890,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 6',
        seatsLeft: 6,
      },
    ],
  },
  {
    id: 'tr-12007',
    number: '12007',
    name: 'Shatabdi / Duronto Special',
    serviceBadge: 'Direct Express • Fastest Running Time',
    punctuality: '99% Punctual',
    runsOn: 'M T W T F S S (All Days)',
    departureTime: '06:00',
    departureStation: 'Bengaluru City Jn (SBC)',
    departurePlatform: 'Platform 5 (Direct Concierge)',
    arrivalTime: '11:15',
    arrivalDayOffset: '+1 day',
    arrivalStation: 'New Delhi (NDLS)',
    arrivalPlatform: 'Platform 1 (Main Concourse)',
    duration: '29 hrs 15 mins',
    defaultClass: '3A',
    classes: [
      {
        code: 'CC',
        label: 'CC (AC Chair Car)',
        description: 'Comfortable recliner seat with complimentary food.',
        price: 2150,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 64',
        seatsLeft: 64,
      },
      {
        code: '3A',
        label: '3A (AC 3 Tier)',
        description: 'AC sleeper berths with wholesome catering.',
        price: 2420,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 28',
        seatsLeft: 28,
      },
      {
        code: '2A',
        label: '2A (AC 2 Tier)',
        description: 'Spacious curtained sleeping berths.',
        price: 3560,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 9',
        seatsLeft: 9,
      },
    ],
  },
  {
    id: 'tr-16524',
    number: '16524',
    name: 'Bengaluru Express Superfast',
    serviceBadge: 'Direct • Regular Service',
    punctuality: '96% On Time',
    runsOn: 'M T W T F S S (All Days)',
    departureTime: '22:15',
    departureStation: 'Bengaluru City Jn (SBC)',
    departurePlatform: 'Platform 3 (Escalator & Lift)',
    arrivalTime: '10:25',
    arrivalDayOffset: '+2 days',
    arrivalStation: 'New Delhi (NDLS)',
    arrivalPlatform: 'Platform 7 (Elevator concourse)',
    duration: '36 hrs 10 mins',
    defaultClass: '2S',
    classes: [
      {
        code: '2S',
        label: '2S (Second Sitting)',
        description: 'Economical reserved cushioned seats.',
        price: 445,
        statusType: 'AVAILABLE',
        statusText: 'AVAILABLE 112',
        seatsLeft: 112,
      },
      {
        code: 'SL',
        label: 'SL (Sleeper)',
        description: 'Reserved sleeper berths with bedding point.',
        price: 720,
        statusType: 'WL',
        statusText: 'WL 14 (Waitlist)',
        seatsLeft: 0,
      },
      {
        code: '3A',
        label: '3A (AC 3 Tier)',
        description: 'AC comfort with high confirmation chance.',
        price: 1920,
        statusType: 'RAC',
        statusText: 'RAC 8 (Reservation Against Cancellation)',
        seatsLeft: 8,
      },
    ],
  },
]

export const MODAL_CONTENT = {
  cancellation: {
    eyebrow: 'Official IRCTC Guidelines',
    title: 'Cancellation & Refund Rules (Indian Railways)',
    bannerTitle: 'Standard Indian Railways & IRCTC Refund Protection',
    bannerText:
      'Refunds are credited directly back to your original source account (UPI / Net Banking / Card) automatically.',
    summaryItems: [
      {
        icon: 'currency_rupee',
        tone: 'tertiary',
        heading: 'More than 48 hours before departure',
        text: 'Flat clerkage fee deduction only (₹180 for 3A / CC, ₹120 for Sleeper, ₹240 for 2A / 1A). Remaining fare is 100% refunded.',
      },
      {
        icon: 'schedule',
        tone: 'secondary',
        heading: 'Between 48 hours and 12 hours before departure',
        text: '25% of total fare deducted, subject to minimum clerkage charge. Balance 75% refunded to your source account.',
      },
      {
        icon: 'timer_off',
        tone: 'surface',
        heading: 'Between 12 hours and 4 hours before departure',
        text: '50% of total fare deducted (minimum clerkage applies). Strictly zero refund after chart preparation (approx. 4 hours before departure).',
      },
    ],
    readMoreLabel:
      'Read detailed rules for RAC, Waitlisted tickets, and filing TDR (>3 hrs delay)',
    readMoreSections: [
      {
        heading: 'RAC & Waitlisted (WL) Ticket Cancellation',
        text: 'RAC or Waitlisted tickets cancelled up to 30 minutes before scheduled departure are charged only flat clerkage (₹60 + GST per passenger). Fully waitlisted e-tickets unconfirmed after chart preparation are cancelled and refunded 100% automatically.',
      },
      {
        heading: 'Train Delayed by More Than 3 Hours',
        text: 'If your train is delayed by more than 3 hours at your boarding station, file an online Ticket Deposit Receipt (TDR) before actual departure to obtain a full 100% refund without cancellation deductions.',
      },
      {
        heading: 'Train Cancelled by Railways',
        text: 'If the train is cancelled due to weather or operational reasons, a 100% full refund is automatically sent to your bank account. No TDR filing is needed for e-tickets.',
      },
      {
        heading: 'Refund Processing Timelines',
        text: 'Online cancellations reflect back in your bank account or UPI source within 3 to 5 working days. Zonal Railway TDR cases settle within 15 to 30 working days.',
      },
    ],
    fullText: [
      'Pursuant to Section 14(b) of the Indian Railways Passenger Tariff, Ticketing and Refund Schedule (Amended 2024), all confirmed electronic reservation requisitions cancelled prior to the preparation of the primary departure reservation chart shall be subject to tiered administrative clerkage and statutory cancellation deductions computed against the base fare component excluding convenience levies and ancillary payment gateway surcharges.',
      'Where a confirmed ticket is cancelled more than forty-eight (48) hours preceding the scheduled departure timestamp at the originating station, a flat clerkage charge of ₹240 (1A/Executive), ₹200 (2A), ₹180 (3A/AC Chair Car), ₹120 (Sleeper), or ₹60 (Second Sitting) per passenger plus applicable GST shall be withheld. Cancellations lodged between forty-eight (48) hours and twelve (12) hours incur a 25% fare deduction, while cancellations between twelve (12) hours and four (4) hours incur a 50% deduction.',
      'Post-charting cancellations submitted fewer than four (4) hours before scheduled departure are deemed non-refundable under Clause 9.3, save for verified force majeure disruptions, train delay exceeding three (3) hours from origin with online Ticket Deposit Receipt (TDR) adjudication filed prior to actual departure, or complete train annulment by Zonal Railways. RAC/Waitlist cancellations up to 30 minutes prior incur ₹60 clerkage per head, and refunds credit exclusively to the originating UPI or banking instrument within 3 to 5 banking business days.',
    ],
  },
  terms: {
    eyebrow: 'Indian Railways Terms',
    title: 'Indian Railways Refund & Booking Terms',
    bannerTitle: 'Plain-English IRCTC Booking & Travel Rules',
    bannerText:
      'Carry one original photo ID card when boarding. Your lower berth priority and free Sahayak support follow official IRCTC guidelines.',
    summaryItems: [
      {
        icon: 'badge',
        tone: 'tertiary',
        heading: 'Valid ID Requirement',
        text: 'Carry one original government photo ID card (Aadhaar Card, Voter ID, Driving License, or Senior Citizen ID) during travel.',
      },
      {
        icon: 'luggage',
        tone: 'secondary',
        heading: 'Free Luggage Allowance',
        text: 'Up to 40 kg in 3A / Sleeper and 50 kg in 2A is included free per adult passenger.',
      },
      {
        icon: 'accessibility_new',
        tone: 'surface',
        heading: 'Cancellation, TDR & Station Assistance',
        text: 'Online TDR is available if your train is delayed over 3 hours. Free Sahayak porter & battery cart requests are available at major stations.',
      },
    ],
    readMoreLabel: 'Read full IRCTC conditions of carriage and dispute rules',
    readMoreSections: [
      {
        heading: '1. Cancellation & TDR Rules',
        text: 'Confirmed tickets cancelled up to 48 hours prior to train departure incur standard IRCTC flat clerkage deductions. Online TDR can be filed if a train is delayed by more than 3 hours.',
      },
      {
        heading: '2. Fare Breakdown & Senior Priority',
        text: 'Quoted fares include Base Fare, Reservation Charge, Superfast Surcharge (where applicable), 5% GST on AC classes, and fixed ₹15 IRCTC convenience fee. Lower berths are prioritised automatically for seniors where available.',
      },
      {
        heading: '3. Payment & Grievance Support',
        text: 'For any duplicate payment or booking discrepancy, dial Railway Helpline 139 (24/7 toll-free) or use the Help button to raise a quick TDR/dispute.',
      },
    ],
    fullText: [
      'BY PROCEEDING WITH THIS ELECTRONIC RESERVATION TRANSACTION, THE PASSENGER ACKNOWLEDGES AND AGREES TO BE BOUND BY THE INDIAN RAILWAYS GENERAL CONDITIONS OF CARRIAGE, IRCTC DIGITAL TICKETING PROTOCOLS, AND STATUTORY LIABILITY LIMITATIONS. ALL PASSENGERS TRAVELLING ON ELECTRONIC RESERVATION SLIPS (ERS/M-TICKET) MUST PRESENT AN ORIGINAL VALID GOVERNMENT-ISSUED PHOTOGRAPHIC IDENTITY DOCUMENT UPON DEMAND BY AUTHORIZED TICKET CHECKING PERSONNEL (TTE).',
      'Fares quoted prior to final settlement incorporate base passenger tariff, reservation charges, superfast surcharges, and statutory goods and services tax (5% GST on air-conditioned classes) alongside the IRCTC convenience fee, which remains non-refundable upon voluntary cancellation. Senior citizen lower berth preference and station Sahayak allotments remain subject to train coach availability and platform operational schedules.',
      'EasyRail operates as an accessible reservation interface and disclaims consequential or incidental liability arising from operational schedule variances, platform reassignments, weather disruptions, or banking gateway delays. Any billing discrepancy, duplicate debit, or failed e-ticket issuance must be reported via Rail Madad 139 or the built-in Help / Raise a dispute workflow for automated bank reconciliation within 5 to 7 working days.',
    ],
  },
}

export const AID_APPLICATIONS = [
  {
    id: 'AID-2026-884',
    title: 'Senior Citizen Travel Aid',
    applicant: 'Debopriya Sen',
    amount: 1200,
    appliedDate: '02-11-2026',
    verifiedDate: '06-11-2026',
    paidDate: null,
    expectedPayDate: '13-11-2026',
    currentStage: 2,
    note: 'Your Aadhaar age proof and bank account were checked and approved. Your ₹1,200 support money will arrive in your bank account soon.',
  },
  {
    id: 'AID-2026-512',
    title: 'October Medical Journey Grant',
    applicant: 'Debopriya Sen',
    amount: 950,
    appliedDate: '05-10-2026',
    verifiedDate: '08-10-2026',
    paidDate: '12-10-2026',
    expectedPayDate: '12-10-2026',
    currentStage: 3,
    note: '₹950 was sent to your State Bank of India account ending in 4312.',
  },
  {
    id: 'AID-2026-931',
    title: 'Winter Rail Pass Support',
    applicant: 'Debopriya Sen',
    amount: 1500,
    appliedDate: '10-11-2026',
    verifiedDate: null,
    paidDate: null,
    expectedPayDate: '18-11-2026',
    currentStage: 1,
    note: 'We have received your application. Our team is checking your details and will update you within 2 to 3 days.',
  },
]

export function formatINR(amount) {
  const num = Number(amount) || 0
  return `₹${num.toLocaleString('en-IN')}`
}

export function formatDateDDMMYYYY(isoDate) {
  if (!isoDate) return '12-11-2026 (Thu)'
  const parts = isoDate.split('-')
  if (parts.length !== 3) return isoDate
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
  if (Number.isNaN(d.getTime())) return isoDate
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return `${day}-${month}-${year} (${weekdays[d.getDay()]})`
}
