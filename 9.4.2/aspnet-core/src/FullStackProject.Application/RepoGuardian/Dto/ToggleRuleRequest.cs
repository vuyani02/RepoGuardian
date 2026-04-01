namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Request to activate or deactivate a compliance rule for the current tenant.</summary>
    public class ToggleRuleRequest
    {
        public string RuleId { get; set; }

        /// <summary>True to activate the rule; false to deactivate it.</summary>
        public bool Activate { get; set; }
    }
}
