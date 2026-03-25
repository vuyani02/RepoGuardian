using FullStackProject.Debugging;

namespace FullStackProject
{
    public class FullStackProjectConsts
    {
        public const string LocalizationSourceName = "FullStackProject";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "728b0d6c63384dccbef3e136c91f4fa6";
    }
}
