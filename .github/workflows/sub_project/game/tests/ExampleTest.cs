namespace SubProject.Tests;

using GdUnit4;
using static GdUnit4.Assertions;

[TestSuite]
public class ExampleTest
{
    [TestCase]
    public void UsesSharedProject()
    {
        AssertInt(Shared.Constants.Answer).IsEqual(42);
    }
}
