const MissionSummaries = require("../schema/MissionSummaries");

const fieldMap = {
  'Pilot Id': 'pilot_id',
  'Pilot Name': 'pilot_name',
  'Drone Code': 'drone_code',
  'Drone UIN': 'drone_uin',
  'Drone UUID': 'drone_uuid',
  'Mission Height': 'mission_height',
  'Clearance Height': 'clearance_height',
  'Payload At Start': 'payload_at_start',
  'Payload At End': 'payload_at_end',
  'Battery Capacity At Start': 'battery_capacity_at_start',
  'Battery Capacity At End': 'battery_capacity_at_end',
  'Area Sprayed At Start': 'area_sprayed_at_start',
  'Area Sprayed At End': 'area_sprayed_at_end',
  'Flight Time': 'flight_time',
  Boundary: 'boundary',
  Plan: 'plan',
  Warnings: 'warnings',
  'Arm Cycle': 'arm_cycle',
}


module.exports = async function creatAirCraft(req, res) {
  try {
    const arm_summarys = req.body.arm_summary;

    await Promise.all(
      arm_summarys.map(async (parameters = []) => {
        const mappedParameters = parameters.parameters.map((data) => {
          if (fieldMap[data?.name]) {
            return {
              [fieldMap[data?.name]]: data?.value,
              units: data?.units
            };
          } else {
            return {
              units: data?.units,
              other: data?.value,
            };
          }
        });

        await MissionSummaries.bulkCreate(mappedParameters);
      })
    );

    return res.status(200).send({ message: "Bulk User Saved" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};


