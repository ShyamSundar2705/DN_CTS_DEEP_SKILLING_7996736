package junitlab;
import static org.junit.Assert.*;
import org.junit.Test;

public class AssertionsTest {
	@Test
    public void testAssertions()
    {
        assertEquals(5,2+3);
        assertTrue(10>5);
        assertFalse(10<5);
        assertNull(null);
        assertNotNull(new Object());
    }
}
