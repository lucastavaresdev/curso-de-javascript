package exercicios

import org.junit.Assert
import org.junit.Test

class ReverseStringTest {
    @Test fun reverseUsingSb(){
        Assert.assertEquals("bs niltok", reverseUsingSb("kotlin Sb"))
    }
    @Test fun reverseUsingLoop(){
        Assert.assertEquals("pool niltok", reverseUsingLoop("kotlin Loop"))
    }
}