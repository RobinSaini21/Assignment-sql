const { Op } = require("sequelize");
const MissionSummaries = require("../schema/MissionSummaries");

module.exports = async function getArmSummarys(req, res) {
  try {
    const missionSummaries = await MissionSummaries.findAll({
      where: {
        [Op.or]: [
          { pilot_name: { [Op.not]: null } },
          { units: { [Op.not]: null } },
          { other: { [Op.not]: null } },
        ],
      },
      attributes: [
        ["pilot_name", "name"],
        ["units", "units"],
        ["other", "value"],
      ],
    });

    missionSummaries.forEach((data) => {
      try {
        data.dataValues.value = JSON.parse(data.dataValues.value);
      } catch (error) {
        data.dataValues.value = data.dataValues.value;
      }
    });
    res.json({arm_summary: [{parameters: missionSummaries}]});
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
