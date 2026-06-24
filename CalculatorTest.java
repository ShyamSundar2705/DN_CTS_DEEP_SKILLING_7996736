package junitlab;
import static org.junit.Assert.*;
import org.junit.Test;

public class CalculatorTest {
	@Test
    public void testAdd()
    {
        Calculator c=new Calculator();
        assertEquals(15,c.add(10,5));
    }

    @Test
    public void testSub()
    {
        Calculator c=new Calculator();
        assertEquals(5,c.sub(10,5));
    }

    @Test
    public void testMul()
    {
        Calculator c=new Calculator();
        assertEquals(50,c.mul(10,5));
    }

    @Test
    public void testDiv()
    {
        Calculator c=new Calculator();
        assertEquals(2,c.div(10,5));
    }
}
