const { Op } = require("sequelize");
const MissionSummaries = require("../schema/MissionSummaries");


const fieldMap = {
  pilot_id: 'Pilot Id',
  pilot_name: 'Pilot Name',
  drone_code: 'Drone Code',
  drone_uin: 'Drone UIN',
  drone_uuid: 'Drone UUID',
  mission_height: 'Mission Height',
  clearance_height: 'Clearance Height',
  payload_at_start: 'Payload At Start',
  payload_at_end: 'Payload At End',
  battery_capacity_at_start: 'Battery Capacity At Start',
  battery_capacity_at_end: 'Battery Capacity At End',
  area_sprayed_at_start: 'Area Sprayed At Start',
  area_sprayed_at_end: 'Area Sprayed At End',
  flight_time: 'Flight Time',
  boundary: 'Boundary',
  plan: 'Plan',
  warnings: 'Warnings',
  arm_cycle: 'Arm Cycle',
   other: "Other"
}

module.exports = async function getArmSummarys(req, res) {
  try {
    const missionSummaries = await MissionSummaries.findAll({
      where: {
        [Op.or]: [
          { pilot_id: { [Op.not]: null } },
          { mission_uuid: { [Op.not]: null } },
          { drone_code: { [Op.not]: null } },
          { drone_uin: { [Op.not]: null } },
          { drone_uuid: { [Op.not]: null } },
          { plan: { [Op.not]: null } },
          { mission_height: { [Op.not]: null } },
          { boundary_name: { [Op.not]: null } },
          { created_at: { [Op.not]: null } },
          { edited_at: { [Op.not]: null } },
          { pilot_name: { [Op.not]: null } },
          { mission_started_at: { [Op.not]: null } },
          { mission_ended_at: { [Op.not]: null } },
          { take_off_location: { [Op.not]: null } },
          { clearance_height: { [Op.not]: null } },
          { payload_at_start: { [Op.not]: null } },
          { payload_at_end: { [Op.not]: null } },
          { battery_capacity_at_start: { [Op.not]: null } },
          { battery_capacity_at_end: { [Op.not]: null } },
          { area_sprayed_at_start: { [Op.not]: null } },
          { area_sprayed_at_end: { [Op.not]: null } },
          { flight_time: { [Op.not]: null } },
          { battery_sn_one: { [Op.not]: null } },
          { battery_sn_two: { [Op.not]: null } },
          { arm_cycle: { [Op.not]: null } },
          { other: { [Op.not]: null } },
          { units: { [Op.not]: null } },
          { warnings: { [Op.not]: null } },
        ],
      },      
    });

const reducedData = missionSummaries.map((data) => {

  return Object.entries(data.dataValues).reduce((acc, [currKey, currValue]) => {
 
  
    if ((currValue || typeof currValue === "string") && fieldMap[currKey]) {
        return { ...acc, name: fieldMap[currKey] , units: data.dataValues.units , value: data.dataValues[currKey]};
      
    }
    if(currKey === "other" && ((currValue || typeof currValue === "string"))){
       if(!isNaN(data.dataValues.other)){
        return { ...acc, name: "Other" , units: data.dataValues.units , value: parseFloat(data.dataValues.other)};
       } else {
        return { ...acc, name: "Other" , units: data.dataValues.units , value: data.dataValues.other};
       }
      
    }
    return acc;
  }, {});
});

    res.json({arm_summary: [{parameters: reducedData.filter(data => Object.keys(data).length)}], length: reducedData.filter(data => Object.keys(data).length).length});
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
