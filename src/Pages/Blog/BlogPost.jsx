import React from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = {
    "1": {
      id: 1,
      title: "5 Essential Tips for First-Time Blood Donors",
      image: "https://images.unsplash.com/photo-1615461065929-4fb2111022e6?auto=format&fit=crop&w=1200&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "donation tips",
      content: `
## Introduction

Donating blood for the first time can be both exciting and nerve-wracking. Understanding what to expect and how to prepare can make your experience smooth and rewarding. Here are five essential tips to help you become a confident first-time donor.

## 1. Stay Hydrated Before and After

**Why it matters:** Proper hydration helps maintain your blood volume and makes the donation process easier.

- Drink at least 16 ounces of water before your appointment
- Avoid alcohol for 24 hours before donating
- Continue drinking plenty of fluids for the next 24-48 hours
- Water, juice, and sports drinks are excellent choices

## 2. Eat Iron-Rich Foods

**The science:** Iron is a crucial component of hemoglobin, which carries oxygen in your blood.

**Best foods to eat:**
- Red meat (beef, lamb)
- Spinach and dark leafy greens
- Beans and lentils
- Iron-fortified cereals
- Nuts and seeds

Start eating iron-rich foods a week before your donation to ensure your iron levels are optimal.

## 3. Get Adequate Sleep

**Why rest matters:** Being well-rested helps your body handle the donation process better and reduces the risk of feeling faint.

- Aim for 7-9 hours of sleep the night before
- Avoid strenuous exercise the morning of your donation
- Feeling tired can make you more prone to dizziness

## 4. Bring Valid Identification

**What you need:**
- Government-issued photo ID (driver's license, passport)
- Donor card if you've donated before
- List of current medications (if applicable)

Most blood banks require proper identification to ensure donor safety and accurate record-keeping.

## 5. Relax and Communicate

**During the donation:**
- Let the staff know it's your first time
- Ask questions if you're uncertain about anything
- Practice deep breathing to stay calm
- Alert staff immediately if you feel dizzy or uncomfortable

## What to Expect

The entire process takes about 45-60 minutes:
1. **Registration** (10 min) - Paperwork and ID verification
2. **Health screening** (10 min) - Brief physical and questionnaire
3. **Donation** (10-15 min) - The actual blood draw
4. **Recovery** (10-15 min) - Rest and refreshments

## After Your Donation

- Keep the bandage on for at least 4 hours
- Avoid heavy lifting for the rest of the day
- Drink extra fluids for 24-48 hours
- Eat a good meal within a few hours
- If you feel faint, sit or lie down immediately

## Conclusion

Your first blood donation is a significant step in saving lives. One donation can help up to three people! By following these tips, you'll have a positive experience and hopefully become a regular donor.

**Ready to donate?** Visit our [Search page](/search) to find donation centers near you!
      `
    },
    "2": {
      id: 2,
      title: "The Science Behind Blood Types",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      author: "Dr. Michael Chen",
      date: "Jan 3, 2026",
      readTime: "7 min read",
      category: "health",
      content: `
## Understanding Blood Types

Blood typing is one of the most critical aspects of modern medicine. Understanding how blood types work can help you appreciate the importance of blood donation and compatibility.

## The ABO System

The ABO blood group system is based on the presence or absence of antigens on red blood cells:

### Type A
- Has A antigens on red cells
- Has anti-B antibodies in plasma
- Can receive: A and O blood
- Can donate to: A and AB

### Type B
- Has B antigens on red cells
- Has anti-A antibodies in plasma
- Can receive: B and O blood
- Can donate to: B and AB

### Type AB (Universal Recipient)
- Has both A and B antigens
- Has no anti-A or anti-B antibodies
- Can receive: Any blood type
- Can donate to: AB only

### Type O (Universal Donor)
- Has no A or B antigens
- Has both anti-A and anti-B antibodies
- Can receive: O blood only
- Can donate to: Anyone

## The Rh Factor

The Rhesus (Rh) factor adds another layer to blood typing:

**Rh Positive (+)**
- Has Rh antigen present
- Can receive Rh+ or Rh- blood
- Most common (85% of population)

**Rh Negative (-)**
- Lacks Rh antigen
- Can only receive Rh- blood
- Less common (15% of population)

## Why Compatibility Matters

Incompatible blood transfusions can cause:
- Severe immune reactions
- Hemolysis (destruction of red blood cells)
- Kidney failure
- Death in extreme cases

This is why blood typing and cross-matching are crucial before any transfusion.

## Blood Type Distribution Globally

**Most Common:**
1. O+ (37% worldwide)
2. A+ (28%)
3. B+ (22%)

**Least Common:**
1. AB- (0.6%)
2. B- (1.5%)
3. AB+ (3.4%)

## Special Characteristics

### O Negative: The Emergency Choice
- Used in emergencies when patient's blood type is unknown
- Always in high demand
- Critical for trauma situations

### AB Positive: The Universal Plasma Donor
- While AB+ can only donate red cells to AB+
- Their plasma can be given to anyone
- Valuable for plasma donations

## Genetics of Blood Types

Blood type is inherited from your parents following Mendelian genetics:
- Each parent contributes one allele
- A and B are co-dominant
- O is recessive

**Example:**
- Parents: A and B
- Possible children: A, B, AB, or O

## Modern Applications

**Beyond Transfusions:**
- Organ transplantation matching
- Forensic science
- Paternity testing
- Disease susceptibility research
- Personalized medicine

## Rare Blood Types

Beyond ABO and Rh, there are over 600 known antigens, creating rare blood types:
- Bombay blood group (less than 0.0004%)
- Rh null (fewer than 50 people worldwide)
- Vel-negative

## Conclusion

Understanding blood types is fundamental to safe transfusion medicine. Every blood type is valuable and needed. Regular donation ensures all types are available when patients need them most.

**Find your blood type and register as a donor today!**
      `
    },
    "3": {
      id: 3,
      title: "How One Donation Saved Three Lives",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?auto=format&fit=crop&w=1200&q=80",
      author: "Priya Patel",
      date: "Dec 28, 2025",
      readTime: "4 min read",
      category: "success stories",
      content: `
## A Single Act of Kindness

When Ahmed walked into the blood donation center on a quiet Tuesday morning, he had no idea his donation would change three lives forever. This is his story, and the story of three people who survived because of his generosity.

## The Donor: Ahmed's Story

Ahmed, a 32-year-old teacher from Chittagong, had been a regular blood donor for five years. 

*"I lost my younger brother in a car accident when I was 18. He needed multiple transfusions, and seeing strangers help save his life inspired me to give back,"* Ahmed recalls.

That Tuesday, he made his 15th donation, not knowing it would be his most impactful yet.

## The Recipients

### Life #1: Baby Ayesha - A Premature Fighter

**The Situation:**
Ayesha was born 10 weeks premature, weighing just 1.2 kg. She needed an immediate blood transfusion to survive.

**How Ahmed's Blood Helped:**
- Red blood cells helped deliver oxygen to Ayesha's underdeveloped lungs
- Enabled her to breathe without a ventilator after just 3 days
- She's now a healthy 6-month-old

*"We're eternally grateful to the stranger who gave our daughter a fighting chance,"* says Ayesha's mother, tearfully.

### Life #2: Mr. Rahman - Cancer Survivor

**The Situation:**
Mr. Rahman, 58, was undergoing intensive chemotherapy for leukemia. The treatment destroyed his bone marrow's ability to produce blood cells.

**How Ahmed's Blood Helped:**
- Platelets from Ahmed's donation prevented life-threatening bleeding
- Allowed Mr. Rahman to continue his cancer treatment
- He's now in remission after 6 months

*"Every donor is a hero. They literally gave me more time with my grandchildren,"* Mr. Rahman shares.

### Life #3: Fatima - Accident Victim

**The Situation:**
Fatima, a 24-year-old university student, was hit by a motorcycle. She suffered severe internal bleeding and lost nearly 40% of her blood volume.

**How Ahmed's Blood Helped:**
- Immediate transfusion stabilized her condition
- Prevented organ failure from low blood pressure
- She's now fully recovered and back to studying

*"I want to meet my donor someday. They're the reason I'm alive to pursue my dreams,"* says Fatima.

## The Science: How One Donation Becomes Three Donations

When you donate one pint of whole blood, it's typically separated into three components:

1. **Red Blood Cells** - Carry oxygen (stored 42 days)
2. **Platelets** - Help with clotting (stored 5 days)
3. **Plasma** - Contains proteins and antibodies (stored 1 year)

Each component can be given to a different patient based on their specific need.

## Ahmed's Reaction

When we told Ahmed his donation helped three people, he was overwhelmed with emotion.

*"I never knew one donation could help so many people. This makes me want to donate even more regularly. If everyone donated just once a year, imagine how many lives we could save!"*

## The Impact in Numbers

Ahmed's single donation:
- 🩸 Saved 3 lives
- ⏰ Took only 45 minutes of his time
- 💝 Cost him nothing but gave everything

## The Bigger Picture

**In Bangladesh:**
- Over 800,000 units of blood are needed annually
- Only 28% of the requirement is met
- 92% of blood is needed for emergency situations

**Your donation could:**
- Help accident victims
- Support cancer patients
- Save premature babies
- Assist surgery patients
- Help people with blood disorders

## How You Can Be a Hero Too

**Steps to Donate:**
1. Find a donation center near you
2. Ensure you meet basic health requirements
3. Schedule an appointment
4. Donate (takes 10-15 minutes)
5. Enjoy refreshments and rest

**Eligibility Criteria:**
- Age 18-65 years
- Weight at least 50 kg
- Good general health
- No recent illness, surgery, or tattoos

## Conclusion

Ahmed's story reminds us that extraordinary impact can come from ordinary actions. One hour of your time, one donation,  can create a ripple effect that saves multiple lives.

**Ready to make a difference? [Find donation opportunities near you](/search)**

---

*This story is based on real events. Names have been changed to protect privacy.*
      `
    },
    "4": {
      id: 4,
      title: "VitalFlow Reaches 15,000 Active Donors",
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=1200&q=80",
      author: "VitalFlow Team",
      date: "Dec 25, 2025",
      readTime: "3 min read",
      category: "news",
      content: `
## A Major Milestone Achieved!

We're thrilled to announce that VitalFlow has reached **15,000 active blood donors** on our platform! This incredible milestone represents not just numbers, but thousands of lives saved and communities strengthened.

## Our Journey

**Timeline:**
- **January 2024**: Launched with 500 registered donors
- **June 2024**: Reached 5,000 donors
- **December 2024**: Hit 10,000 donors
- **December 2025**: Celebrating 15,000 active donors!

## By the Numbers

### Impact Statistics

🎯 **15,000+** Active Donors
📍 **64** Districts Covered
🏥 **450+** Partnered Hospitals
🩸 **3,500+** Lives Saved
⚡ **98%** Success Rate
⏱️ **<2 hours** Average Response Time

### Blood Type Distribution

Our donor base covers all blood types:
- O+ (5,550 donors - 37%)
- A+ (4,200 donors - 28%)
- B+ (3,300 donors - 22%)
- O- (450 donors - 3%)
- A- (300 donors - 2%)
- B- (225 donors - 1.5%)
- AB+ (510 donors - 3.4%)
- AB- (90 donors - 0.6%)

## Success Stories

### Emergency Response Excellence

**Case Study - Ramadan Emergency:**
During Ramadan 2025, we responded to 127 urgent blood requests:
- 94% fulfilled within 6 hours
- 6% fulfilled within 24 hours
- 100% success rate

**Donor Spotlight:**
*"VitalFlow connected me with a patient in need within 30 minutes. The platform made it incredibly easy to save a life!" - Kamal, Dhaka*

## What Makes VitalFlow Special

### 1. Technology-Driven Matching
Our AI-powered algorithm matches donors with recipients based on:
- Blood type compatibility
- Geographic proximity
- Urgency level
- Availability status

### 2. 24/7 Availability
Round-the-clock platform access ensures:
- Emergency requests get immediate attention
- Donors can update availability anytime
- Real-time notifications

### 3. Community Building
We're more than a platform:
- Regular blood donation camps
- Health awareness programs
- Donor appreciation events
- Educational workshops

### 4. Safety First
Stringent verification process:
- Medical history screening
- Identity verification
- Hospital partnership validation
- Feedback system

## Community Feedback

⭐⭐⭐⭐⭐ **4.9/5** average rating from our users

*"VitalFlow saved my father's life during his surgery. The donor arrived within an hour!" - Fatima, Chittagong*

*"As a regular donor, this platform makes it so easy to help people. Highly recommended!" - Rashid, Sylhet*

*"The verification process gave me confidence that everything is safe and legitimate." - Nadia, Khulna*

## Looking Ahead: 2026 Goals

### Expansion Plans

**Geographic Growth:**
- Reach all 64 districts of Bangladesh
- Establish presence in every upazila
- Partner with 100 more hospitals

**Technology Enhancement:**
- Mobile app launch (iOS & Android)
- AI chatbot for instant support
- Blockchain for secure records
- Multilingual support (Bangla, English, local dialects)

**Target:**
- **25,000 active donors** by June 2026
- **50,000 active donors** by December 2026
- **5,000+ lives saved** in 2026

### New Features Coming

1. **Donation History Tracking**
   - Digital donor cards
   - Achievement badges
   - Milestone celebrations

2. **Health Insights**
   - Pre-donation health tips
   - Post-donation care guides
   - Nutrition recommendations

3. **Community Features**
   - Donor leaderboards
   - Local donation events
   - Social sharing

## Thank You to Our Donors

This milestone wouldn't be possible without each of you who:
- Registered on our platform
- Donated when called upon
- Spread awareness in your communities
- Provided valuable feedback

**Special Recognition:**
- Top Donor: Mr. Hassan (24 donations via VitalFlow)
- Most Active City: Dhaka (6,200 donors)
- Fastest Response: Dr. Alam (responded in 8 minutes)

## How You Can Contribute

### Join the Movement

**As a Donor:**
1. Register on VitalFlow
2. Keep your availability updated
3. Respond to requests promptly
4. Donate regularly

**Spread the Word:**
- Share VitalFlow with friends and family
- Post on social media
- Organize awareness campaigns
- Participate in donation drives

**Partner With Us:**
- Hospitals and clinics
- Corporate sponsors
- NGOs and nonprofits
- Educational institutions

## Celebrating Together

To mark this milestone, we're launching:

**"15K Campaign"**
- Free health check-ups for donors
- Special appreciation certificates
- Donation camp in all major cities
- Social media contest with prizes

## Conclusion

Reaching 15,000 donors is not just our achievement—it's **yours**. Every donor, every hospital partner, every team member contributed to this success.

But our work is far from done. There are still thousands waiting for blood, and we're committed to connecting every patient with every willing donor.

**Together, we can save more lives in 2026!**

---

**Join VitalFlow Today:**
[Register as a Donor](/auth/register) | [Find Donors](/search) | [Contact Us](/contact)

*Thank you for being part of the VitalFlow family! 🩸❤️*
      `
    },
    "5": {
      id: 5,
      title: "Preparing for Blood Donation: Do's and Don'ts",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Dec 20, 2025",
      readTime: "6 min read",
      category: "donation tips",
      content: `
## Your Complete Pre-Donation Guide

Proper preparation ensures a smooth donation experience and helps you recover quickly. Here's everything you need to know about what to do (and what to avoid) before donating blood.

## 24-48 Hours Before: DO's

### ✅ Hydrate Abundantly
**Why it matters:** Proper hydration increases blood volume and makes veins more accessible.

**Action plan:**
- Drink at least 8-10 glasses of water daily
- Increase intake if exercising
- Include electrolyte drinks
- Coconut water is excellent

### ✅ Eat Iron-Rich Foods
**The science:** Iron helps your body replace donated red blood cells faster.

**Best sources:**
- Red meat (beef, lamb, liver)
- Dark leafy greens (spinach, kale)
- Beans and lentils
- Fortified cereals
- Tofu and tempeh
- Dried fruits (raisins, apricots)

### ✅ Get Quality Sleep
**Target:** 7-9 hours of uninterrupted sleep

**Benefits:**
- Reduces risk of fainting
- Speeds recovery
- Improves overall well-being
- Stabilizes blood pressure

### ✅ Maintain Regular Meals
**Don't skip meals!**
- Eat balanced meals with protein, carbs, and healthy fats
- Include vitamin C foods to enhance iron absorption
- Keep blood sugar stable

## 24-48 Hours Before: DON'Ts

### ❌ Avoid Alcohol
**Minimum:** 24 hours before donation

**Reasons:**
- Dehydrates your body
- Affects blood pressure
- Impairs judgment
- Slows recovery

### ❌ No Aspirin or Anti-inflammatory Drugs
**Timing:** Avoid 48 hours before donation (for platelet donors)

**Affected medications:**
- Aspirin
- Ibuprofen (Advil, Motrin)
- Naproxen (Aleve)

*Acetaminophen (Tylenol) is okay*

### ❌ Limit Fatty Foods
**Avoid:**
- Fast food
- Fried foods
- Excessive dairy
- Processed snacks

**Why:** Fat in blood can interfere with testing and processing

### ❌ Don't Smoke
**Recommendation:** Avoid smoking at least 2-3 hours before

**Impact:**
- Affects oxygen levels
- Increases dizziness risk
- May affect eligibility

## The Day of Donation: DO's

### ✅ Eat a Healthy Breakfast/Meal
**2-3 hours before donation**

**Ideal pre-donation meal:**
- Whole grain toast with peanut butter
- Oatmeal with fruits and nuts
- Eggs with whole wheat toast
- Fresh fruit smoothie with protein
- Rice with dal and vegetables

### ✅ Dress Appropriately
**Wear:**
- Short sleeves or loose sleeves that roll up easily
- Comfortable clothing
- Layers (donation centers can be cool)

**Bring:**
- Valid ID
- Donor card (if you have one)
- List of current medications

### ✅ Arrive Relaxed
**Tips:**
- Don't rush; plan extra time
- Listen to calming music
- Practice deep breathing
- Bring a friend for support

### ✅ Communicate
**Tell the staff:**
- If it's your first time
- If you have small veins
- If you feel nervous
- Any concerns or questions

## The Day of Donation: DON'Ts

### ❌ Don't Donate on an Empty Stomach
**Risks:**
- Dizziness
- Fainting
- Low blood sugar
- Nausea

### ❌ Avoid Strenuous Exercise
**Before donation:**
- No heavy lifting
- No intense cardio
- No competitive sports

*Light walking is fine*

### ❌ Don't Arrive Dehydrated
**Last-minute hydration:**
- Drink 16 oz of water 1 hour before
- Sip water up until donation
- Use the restroom before starting

### ❌ Don't Panic
**If you feel nervous:**
- Focus on breathing
- Ask questions
- Request a stress ball
- Think about the lives you're saving

## During Donation: Best Practices

### ✅ DO

**Relax:**
- Keep arm straight and still
- Don't clench fist repeatedly
- Breathe normally

**Communicate:**
- Tell staff if you feel dizzy
- Ask for blanket if cold
- Request water if needed

**Distract yourself:**
- Chat with staff
- Watch videos on phone
- Listen to music
- Read a book

### ❌ DON'T

**Avoid:**
- Looking at the needle
- Holding your breath
- Crossing legs
- Tensing up

## After Donation: DO's (First Hour)

### ✅ Rest and Recover
**Minimum:** 10-15 minutes in recovery area

**Actions:**
- Sit quietly
- Eat provided snacks
- Drink juice or water
- Let staff know when you're ready to leave

### ✅ Apply Pressure
**If bleeding:**
- Keep bandage on for 4-5 hours
- Elevate arm if needed
- Apply gentle pressure

### ✅ Eat and Drink
**Immediately after:**
- Have the provided snacks
- Drink fruit juice
- Continue hydrating

## After Donation: DON'Ts (First 24 Hours)

### ❌ No Heavy Lifting
**Avoid for 5-6 hours:**
- Weightlifting
- Moving furniture
- Carrying heavy bags
- Strenuous arm exercises

### ❌ No Alcohol
**Wait:** At least 8 hours, ideally 24

**Why:** Prevents dehydration and dizziness

### ❌ Don't Skip Meals
**Important:** Eat regular, nutritious meals to help your body recover

### ❌ Avoid Hot Showers
**For first 5 hours:**
- No hot baths
- No saunas
- No steam rooms

*Warm showers are okay*

## Recovery: First 48 Hours

### ✅ Continue Hydrating
- 8-10 glasses of water daily
- Include electrolyte drinks
-  Monitor urine color (should be pale yellow)

### ✅ Eat Iron-Rich Foods
**Replenish iron stores:**
- Red meat
- Fortified cereals
- Spinach and broccoli
- Beans and lentils

**Pro tip:** Pair with vitamin C for better absorption

### ✅ Rest If Needed
**Listen to your body:**
- Take naps if tired
- Avoid overexertion
- Get adequate sleep

## Warning Signs - When to Seek Help

**Contact medical staff if you experience:**
- Persistent dizziness or fainting
- Excessive bruising at needle site
- Pain that worsens
- Numbness or tingling in arm
- Fever or chills
- Continued bleeding

## Special Considerations

### First-Time Donors
- Extra hydration recommended
- Bring a support person
- Clear your schedule after
- Don't drive immediately if feeling weak

### Regular Donors
- Wait 8 weeks between whole blood donations
- Track donations in donor app
- Monitor iron levels annually
- Consider platelet or plasma donation

### Specific Conditions

**Diabetes:**
- Monitor blood sugar closely
- Bring glucose tablets
- Eat well before donation

**Medications:**
- Bring list of current medications
- Some may affect eligibility
- Consult with donation center

## Conclusion

Proper preparation makes blood donation safe, comfortable, and beneficial for both you and the recipient. Following these do's and don'ts ensures you'll have a positive experience and recover quickly.

**Remember:** Your donation saves lives! A little preparation goes a long way.

**Ready to donate? [Find a donation center near you!](/search)**

---

*Always consult with healthcare professionals if you have specific health concerns.*
      `
    },
    "6": {
      id: 6,
      title: "Understanding Platelet Donation",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
      author: "Dr. Michael Chen",
      date: "Dec 15, 2025",
      readTime: "5 min read",
      category: "health",
      content: `
## What Are Platelets?

Platelets are tiny, colorless cell fragments in your blood that play a crucial role in blood clotting. Understanding platelet donation can help you decide if this special type of donation is right for you.

## Platelets vs. Whole Blood Donation

### Whole Blood Donation
- Takes 10-15 minutes
- Collects all blood components
- Can donate every 8 weeks
- Helps 1-3 patients

### Platelet Donation (Apheresis)
- Takes 1.5-2 hours
- Collects only platelets
- Can donate every 2 weeks (up to 24 times/year)
- Helps 1 patient with a full dose

## The Apheresis Process

**How it works:**
1. Blood is drawn from one arm
2. Machine separates platelets
3. Red cells and plasma returned to other arm
4. Process repeats for 60-90 minutes

**What makes it special:**
- You get your red blood cells back
- Less impact on your body
- Higher platelet yield
- Faster recovery

## Who Needs Platelets?

### Cancer Patients
- Chemotherapy destroys platelet production
- Need transfusions to prevent bleeding
- May require multiple units per week

### Surgery Patients
- Major surgeries (cardiac, organ transplant)
- Trauma with severe blood loss
- Prevent excessive bleeding

### Blood Disorders
- Aplastic anemia
- Leukemia
- Immune thrombocytopenia (ITP)
- Other platelet disorders

### Burn Victims
- Large surface area burns
- Multiple transfusions needed
- Critical for recovery

## Benefits of Platelet Donation

### For Recipients
✅ Concentrated dose from single donor
✅ Reduced exposure to multiple donors
✅ Lower infection risk
✅ Better compatibility

### For Donors
✅ Donate more frequently
✅ Help more patients
✅ Faster recovery
✅ Keep red blood cells

## Eligibility Requirements

### Basic Criteria
- Age: 18-65 years (some centers allow to 70)
- Weight: Minimum 50 kg (110 lbs)
- Good general health
- Not pregnant or nursing

### Blood Type Considerations

**Most Needed:**
- A positive
- B positive
- AB positive (universal platelet donors)
- O positive

*All blood types needed and welcome!*

### Additional Requirements
- Higher platelet count than whole blood (150,000+)
- Adequate vein access in both arms
- No aspirin for 48 hours before
- No recent tattoos or piercings (6 months)

## Preparing for Platelet Donation

### 48 Hours Before

**✅ DO:**
- Drink plenty of fluids
- Eat calcium-rich foods
- Get good sleep
- Take regular medications (except aspirin)

**❌ DON'T:**
- Take aspirin or anti-inflammatory drugs
- Drink alcohol
- Smoke excessively
- Get new tattoos

### Day of Donation

**Eat well:**
- Calcium-rich breakfast (milk, yogurt, cheese)
- Avoid fatty foods
- Stay hydrated

**What to bring:**
- Valid photo ID
- Entertainment (book, tablet, headphones)
- Comfortable clothing
- Patience (it takes time!)

## During the Donation

### The Setup
- Comfortable reclining chair
- Both arms accessed
- Blanket available (process can feel cold)
- TV or entertainment

### What to Expect
**Physical sensations:**
- Slight pressure from blood pressure cuff
- Coolness from returned blood
- Tingling (from anticoagulant)
- Occasional arm cramping

**Duration:**
- Setup: 15-20 minutes
- Collection: 60-90 minutes
- Rest: 10-15 minutes
- Total: 1.5-2 hours

### Tips for Comfort
- Bring entertainment
- Use restroom beforehand
- Wear layers
- Squeeze stress ball as directed
- Communicate with staff

## Potential Side Effects

### Common (Mild)
- Tingling lips or tongue (calcium citrate reaction)
- Feeling cold
- Light bruising at needle site
- Fatigue

**Solutions:**
- Staff can slow machine
- Extra blankets provided
- Calcium supplements given
- Rest after donation

### Rare (Serious)
- Severe allergic reaction
- Excessive bruising
- Nerve injury

*Alert staff immediately if you experience unusual symptoms*

## After Your Donation

### Immediate Care
- Keep bandages on for 4-5 hours
- Drink plenty of fluids
- Eat iron-rich foods
- Avoid strenuous activity for 24 hours

### Recovery Timeline
- **Day 1:** Take it easy, stay hydrated
- **Days 2-3:** Back to normal activities
- **Week 1:** Platelet levels fully restored
- **Week 2:** Eligible to donate again

## Platelet Donation Facts

### Shelf Life
- Platelets expire in just **5 days**
- Must be stored at room temperature
- Constantly needed
- Cannot be stockpiled

### Impact
- One apheresis donation = 6-8 whole blood donations
- Single donor provides full treatment dose
- Average patient needs 1-2 units daily during treatment
- Your donation directly helps specific patient

## Frequency & Scheduling

### How Often?
- **Platelet donors:** Every 2 weeks (up to 24x/year)
- **Whole blood donors:** Every 8 weeks (6x/year)

### Why More Frequent?
- Platelets regenerate quickly (48-72 hours)
- Body replaces them faster than red cells
- Less physiological stress

### Scheduling Tips
- Same day/time helps create routine
- Mornings often have shorter wait
- Book in advance
- Regular appointments help patients count on supply

## Technology & Safety

### Modern Apheresis Machines
- Sterile, single-use kits
- Computer-controlled process
- Real-time monitoring
- Maximum safety features

### Safety Measures
- Continuous nurse monitoring
- Emergency stop button
- Automatic safety alerts
- Quality control testing

## Special Platelet Programs

### Directed Donation
- Donate for specific patient
- Often family member
- Requires advance arrangement
- Must meet compatibility

### Hemapheresis
- Can donate platelets + plasma simultaneously
- Helps two patient populations
- Longer procedure (2-3 hours)
- Maximum impact

## Becoming a Regular Donor

### Benefits of Regular Donation
- Priority scheduling
- Know your donation directly helps
- Build relationship with staff
- Track your impact over time

### Recognition Programs
- Milestone certificates
- Achievement badges
- Donor appreciation events
- Special donor cards

## Conclusion

Platelet donation is a unique way to make a significant impact. While it requires more time than whole blood donation, the ability to help cancer patients and save lives makes it incredibly rewarding.

One platelet donation can mean the difference between life and death for a cancer patient undergoing chemotherapy.

**Interesting Fact:** Some serial platelet donors have given over 1,000 units in their lifetime, helping thousands of patients!

## Ready to Become a Platelet Donor?

**Next Steps:**
1. [Register on VitalFlow](/auth/register)
2. Contact  your nearest donation center
3. Schedule a screening appointment
4. Begin your platelet donation journey

**Questions? [Contact our team](/contact) for more information!**

---

*Consult with donation center staff about your specific eligibility and any health concerns.*
      `
    }
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h2>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white text-sm font-bold rounded-full uppercase">
            {post.category}
          </span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="absolute top-8 right-8 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </button>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="bg-slate-50 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readTime}</span>
            </div>
            <div className="ml-auto flex gap-3">
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-lg transition-all">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-lg transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:text-gray-700 dark:prose-ul:text-gray-300
            prose-li:marker:text-red-600 dark:prose-li:marker:text-red-400"
          dangerouslySetInnerHTML={{ __html: post.content.split('\n').map(line => {
            if (line.startsWith('## ')) {
              return `<h2>${line.substring(3)}</h2>`;
            } else if (line.startsWith('### ')) {
              return `<h3>${line.substring(4)}</h3>`;
            } else if (line.startsWith('**') && line.endsWith('**')) {
              return `<p><strong>${line.slice(2, -2)}</strong></p>`;
            } else if (line.startsWith('✅ ') || line.startsWith('❌ ') || line.startsWith('- ')) {
              return `<li>${line.substring(2)}</li>`;
            } else if (line.startsWith('*') && line.endsWith('*') && !line.includes('**')) {
              return `<p><em>${line.slice(1, -1)}</em></p>`;
            } else if (line.trim()) {
              return `<p>${line}</p>`;
            }
            return '';
          }).join('') }}
        />
      </article>

      {/* Related Posts CTA */}
      <div className="bg-slate-50 dark:bg-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Read More Articles
          </h3>
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-xl"
          >
            View All Blog Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
