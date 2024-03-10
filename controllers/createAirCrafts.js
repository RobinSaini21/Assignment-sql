
const MissionSummaries = require("../schema/MissionSummaries")

  module.exports = async function creatAirCraft(req, res) {
    try {
      const arm_summarys = req.body.arm_summary;
  
      await Promise.all(
        arm_summarys.map(async (parameters = []) => {
          const mappedParameters = parameters.parameters.map((data) => ({
            pilot_name: data?.name,
            units: data?.units,
            other: data?.value,
          }));
  

          await MissionSummaries.bulkCreate(mappedParameters);
        })
      );
  
      return res.status(200).send({ message: "Bulk User Saved" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" , error });
    }
  };
  