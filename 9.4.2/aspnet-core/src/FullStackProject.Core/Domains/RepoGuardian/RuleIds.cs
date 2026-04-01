namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>Canonical list of all compliance rule identifiers supported by the engine.</summary>
    public static class RuleIds
    {
        public static readonly string[] All =
        {
            "DOC_001", "DOC_002", "DOC_003", "DOC_004", "DOC_005",
            "TEST_001", "TEST_002",
            "CICD_001", "CICD_002", "CICD_003", "CICD_004",
            "DEP_001", "DEP_002",
            "SEC_001", "SEC_002", "SEC_003", "SEC_004"
        };
    }
}
