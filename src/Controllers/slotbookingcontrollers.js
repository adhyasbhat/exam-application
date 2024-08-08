const Booking = require('../Modules/slotbookingModule');
const TimeSlot = require('../Modules/timeSlotModule');
const Candidate = require('../Modules/candidateModule');
const KGIDCandidate = require('../Modules/kgidcandidateModule');
// Book a time slot
const BookSlot = async (req, res) => {
    const { email, date, time, district } = req.body;
    console.log('Request received:', { email, date, time, district });

    try {
        const user_email=await Booking.findOne({email:email});
        console.log(user_email)
        if(user_email){
           
           return res.status(404).json({error:"user can book only one slot"}) 
        }
       
       
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
      
        getTimeSlot1(parsedDate)
        const timeSlot = await TimeSlot.findOne({ date:parsedDate });
        console.log(timeSlot,"timeSlott")
       


        if (!timeSlot) {
            return res.status(404).json({ error: 'Time slot not found' });
        }

        console.log('TimeSlot found:', timeSlot);

        const slot = timeSlot.slots.find(slot => slot.time === time);
        

        if (!slot) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        console.log('Slot found:', slot);

        if (slot.bookings >= 10) {
            return res.status(400).json({ error: 'Slot is full' });
        }

        slot.bookings += 1;
        await timeSlot.save();

        const newBooking = new Booking({ email, date: parsedDate, time, district });
        await newBooking.save();
        let updateCandidate = []
const findEmailwithoutKGID = await Candidate.findOne({ email:email });
if(findEmailwithoutKGID){
    updateCandidate = await Candidate.findOneAndUpdate(
        { email: email },  
        { booking_id: newBooking._id },
        { new: true, upsert: true }  // Create if not exists
    );
}
const findEmailwithKGID = await KGIDCandidate.findOne({ email:email});
if(findEmailwithKGID){
    updateCandidate = await KGIDCandidate.findOneAndUpdate(
        { email: email },  
        { booking_id: newBooking._id },
        { new: true, upsert: true }  // Create if not exists
    );
    }
        res.status(200).json({ message: 'Slot booked successfully', booking: newBooking, candidate: updateCandidate });

      
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ error: 'Failed to book slot' });
    }
};



const viewBook=async(req,res)=>{
    try{
        const email=req.body.email;
const booking=await Booking.findOne({email:email});

res.send(booking);

    }catch(err){
        console.log('some internal error');
        res.status(500).json({err:"some internal error"});  
    }
}



const generateTimeSlots = () => {
    return [
        { time: '09:00 AM - 10:00 AM', bookings: 0 },
        { time: '12:00 PM - 01:00 PM', bookings: 0 },
        { time: '02:00 PM - 03:00 PM', bookings: 0 }
    ];
};

async function getTimeSlot1(parsedDate){
    console.log(parsedDate,"parsedx date")
    let timeSlot = await TimeSlot.findOne({ date: parsedDate });

 console.log("timeSLot",timeSlot)
    if (!timeSlot) {
      
        const slots = generateTimeSlots();

        
        timeSlot = new TimeSlot({
            date: parsedDate,
            slots
        });
        await timeSlot.save();
    }
}
const getTimeSlots = async (req, res) => {



    const { date } = req.body ;
    const parsedDate = new Date(date);
    console.log(parsedDate)
try{
    console.log("here")
    if (isNaN(parsedDate.getTime())) {
        console.log("time")
        return res.status(400).json({ error: 'Invalid date format' });
    }
    

    

    let timeSlot = await TimeSlot.findOne({ date: parsedDate });
 console.log("timeSLot",timeSlot)
    if (!timeSlot) {
      
        const slots = generateTimeSlots();

        
        timeSlot = new TimeSlot({
            date: parsedDate,
            slots
        });
        await timeSlot.save();
    }

    res.status(200).json({ slots: timeSlot.slots });
}
   

     catch (error) {
        console.error('Failed to fetch time slots:', error);
        res.status(500).json({ error: 'Failed to fetch time slots' });
    }
    
  };

module.exports = {BookSlot,viewBook,getTimeSlots};











