// const express = require("express");
// const { slotbookingSchema } = require("../Modules/slotbookingModule");
// const slotbookingControllers = {};

// // Function to update available slots count
// const updateAvailableSlots = async (districtname, slotdate, batch, increment) => {
//   try {
//     const slot = await slotbookingSchema.findOne({
//       districtname,
//       slotdate,
//       batch
//     });

//     if (slot) {
//       slot.availableSlots += increment;
//       await slot.save();
//     }
//   } catch (error) {
//     console.error(`Error updating available slots for batch ${batch} on ${slotdate}:`, error);
//   }
// };

// slotbookingControllers.addSlot = async (req, res) => {
//   try {
//     const { districtname, slotdate, batch, maxSlotsPerBatch, slotstatus } = req.body;

//     let slot = await slotbookingSchema.findOne({
//       districtname,
//       slotdate,
//       batch
//     });

//     if (slot) {
//       return res.status(400).send("Slots already added for this batch.");
//     }

//     slot = new slotbookingSchema({
//       districtname,
//       slotdate,
//       batch,
//       maxSlotsPerBatch,
//       availableSlots: maxSlotsPerBatch,
//       slotstatus
//     });

//     await slot.save();
//     res.send("Slots added successfully");
//   } catch (error) {
//     console.error("Error adding slots:", error);
//     res.status(500).send("Error in adding slots: " + error.message);
//   }
// };

// slotbookingControllers.getSlot = async (req, res) => {
//   try {
//     const { districtname, slotdate } = req.body;

//     const slots = await slotbookingSchema.find({
//       districtname,
//       slotdate,
//       slotstatus: "Available"
//     }).select("-_id districtname slotdate batch slotstatus availableSlots");

//     if (!slots || slots.length === 0) {
//       return res.status(404).send("Slots not found for this date and district.");
//     }

//     res.send(slots);
//   } catch (error) {
//     console.error("Error getting slots:", error);
//     res.status(500).send("Error in getting slots: " + error.message);
//   }
// };

// slotbookingControllers.bookSlot = async (req, res) => {
//   try {
//     const { districtname, slotdate, batch } = req.body;

//     const slot = await slotbookingSchema.findOne({
//       districtname,
//       slotdate,
//       batch,
//       slotstatus: "Available"
//     });

//     if (!slot || slot.availableSlots <= 0) {
//       return res.status(400).send("No available slots for this batch.");
//     }

//     slot.availableSlots -= 1;
//     await slot.save();

//     res.send("Slot booked successfully");
//   } catch (error) {
//     console.error("Error booking slot:", error);
//     res.status(500).send("Error in booking slot: " + error.message);
//   }
// };

// slotbookingControllers.deleteSlot = async (req, res) => {
//   try {
//     const { districtname, slotdate, batch } = req.body;

//     const slot = await slotbookingSchema.findOne({
//       districtname,
//       slotdate,
//       batch
//     });

//     if (!slot) {
//       return res.status(404).send("Slot not found");
//     }

//     await slotbookingSchema.deleteOne({ districtname, slotdate, batch });
//     updateAvailableSlots(districtname, slotdate, batch, slot.maxSlotsPerBatch); // Increase available slots

//     res.send("Slot deleted successfully");
//   } catch (error) {
//     console.error("Error deleting slot:", error);
//     res.status(500).send("Error in deleting slot: " + error.message);
//   }
// };

// slotbookingControllers.updateSlot = async (req, res) => {
//   try {
//     const { districtname, slotdate, batch, maxSlotsPerBatch } = req.body;

//     const slot = await slotbookingSchema.findOne({
//       districtname,
//       slotdate,
//       batch
//     });

//     if (!slot) {
//       return res.status(404).send("Slot not found");
//     }

//     slot.maxSlotsPerBatch = maxSlotsPerBatch;
//     await slot.save();

//     res.send("Slot updated successfully");
//   } catch (error) {
//     console.error("Error updating slot:", error);
//     res.status(500).send("Error in updating slot: " + error.message);
//   }
// };

// module.exports = slotbookingControllers;


const Booking = require('../Modules/slotbookingModule');
const TimeSlot = require('../Modules/timeSlotModule');

// Book a time slot
const BookSlot = async (req, res) => {
    const { user_id, date, time, district } = req.body;
    console.log('Request received:', { user_id, date, time, district });

    try {
        const user_email=await Booking.findOne({user_id:user_id});
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

        const newBooking = new Booking({ user_id, date: parsedDate, time, district });
        await newBooking.save();
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { _id: user_id },  // Assuming user_id corresponds to _id in the Candidate model
            { booking_id: newBooking._id },
            { new: true, upsert: true }  // Create if not exists
        );

        res.status(200).json({ message: 'Slot booked successfully', booking: newBooking, candidate: updatedCandidate });

      
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ error: 'Failed to book slot' });
    }
};



const viewBook=async(req,res)=>{
    try{
        const user_id=req.params.user_id;
const booking=await Booking.findOne({user_id:user_id});

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











