const express = require("express");
const { slotbookingSchema } = require("../Modules/slotbookingModule");
const slotbookingControllers = {};

// Function to update available slots count
const updateAvailableSlots = async (districtname, slotdate, batch, increment) => {
  try {
    const slot = await slotbookingSchema.findOne({
      districtname,
      slotdate,
      batch
    });

    if (slot) {
      slot.availableSlots += increment;
      await slot.save();
    }
  } catch (error) {
    console.error(`Error updating available slots for batch ${batch} on ${slotdate}:`, error);
  }
};

slotbookingControllers.addSlot = async (req, res) => {
  try {
    const { districtname, slotdate, batch, maxSlotsPerBatch, slotstatus } = req.body;

    let slot = await slotbookingSchema.findOne({
      districtname,
      slotdate,
      batch
    });

    if (slot) {
      return res.status(400).send("Slots already added for this batch.");
    }

    slot = new slotbookingSchema({
      districtname,
      slotdate,
      batch,
      maxSlotsPerBatch,
      availableSlots: maxSlotsPerBatch,
      slotstatus
    });

    await slot.save();
    res.send("Slots added successfully");
  } catch (error) {
    console.error("Error adding slots:", error);
    res.status(500).send("Error in adding slots: " + error.message);
  }
};

slotbookingControllers.getSlot = async (req, res) => {
  try {
    const { districtname, slotdate } = req.body;

    const slots = await slotbookingSchema.find({
      districtname,
      slotdate,
      slotstatus: "Available"
    }).select("-_id districtname slotdate batch slotstatus availableSlots");

    if (!slots || slots.length === 0) {
      return res.status(404).send("Slots not found for this date and district.");
    }

    res.send(slots);
  } catch (error) {
    console.error("Error getting slots:", error);
    res.status(500).send("Error in getting slots: " + error.message);
  }
};

slotbookingControllers.bookSlot = async (req, res) => {
  try {
    const { districtname, slotdate, batch } = req.body;

    const slot = await slotbookingSchema.findOne({
      districtname,
      slotdate,
      batch,
      slotstatus: "Available"
    });

    if (!slot || slot.availableSlots <= 0) {
      return res.status(400).send("No available slots for this batch.");
    }

    slot.availableSlots -= 1;
    await slot.save();

    res.send("Slot booked successfully");
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send("Error in booking slot: " + error.message);
  }
};

slotbookingControllers.deleteSlot = async (req, res) => {
  try {
    const { districtname, slotdate, batch } = req.body;

    const slot = await slotbookingSchema.findOne({
      districtname,
      slotdate,
      batch
    });

    if (!slot) {
      return res.status(404).send("Slot not found");
    }

    await slotbookingSchema.deleteOne({ districtname, slotdate, batch });
    updateAvailableSlots(districtname, slotdate, batch, slot.maxSlotsPerBatch); // Increase available slots

    res.send("Slot deleted successfully");
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).send("Error in deleting slot: " + error.message);
  }
};

slotbookingControllers.updateSlot = async (req, res) => {
  try {
    const { districtname, slotdate, batch, maxSlotsPerBatch } = req.body;

    const slot = await slotbookingSchema.findOne({
      districtname,
      slotdate,
      batch
    });

    if (!slot) {
      return res.status(404).send("Slot not found");
    }

    slot.maxSlotsPerBatch = maxSlotsPerBatch;
    await slot.save();

    res.send("Slot updated successfully");
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).send("Error in updating slot: " + error.message);
  }
};

module.exports = slotbookingControllers;
